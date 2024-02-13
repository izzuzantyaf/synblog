"use client";
import { Navbar } from "@/components/Navbar";
import { TypographyH1 } from "@/components/typography/h1";
import { Button } from "@/components/ui/button";
import { useDeleteUser, useGetUsers } from "@/modules/gorest/gorest.hooks";
import {
  ArrowLeftIcon,
  Loader2,
  PencilLineIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { DrawerDialog } from "@/components/ui/drawer-dialog";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function UserPage() {
  const { isGetUsersLoading, getUsersError, getUsersData, getUsers } =
    useGetUsers({
      page: 1,
      per_page: 12,
    });

  const { toast } = useToast();

  const [debouncedKeyword, updateDebouncedKeyword] = useDebounceValue("", 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDebouncedKeyword(e.target.value);
  };

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { deleteUser, isDeleteUserLoading } = useDeleteUser();
  const handleDelete = async (id: Gorest.User["id"]) => {
    try {
      await deleteUser(id);
      toast({
        title: "User deleted",
      });
      setDeleteDialogOpen(false);
      getUsers();
    } catch (error) {
      toast({
        title: "Delete user failed",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <main>
        {/* Navbar */}
        <Navbar />
        {/* end of Navbar */}

        <div className="px-[16px] pb-0 max-w-screen-lg mx-auto">
          <Button size="icon" variant="ghost" asChild>
            <Link href="/">
              <ArrowLeftIcon />
            </Link>
          </Button>
        </div>

        <div className="p-[16px] pt-0 mt-[16px] max-w-screen-lg mx-auto ">
          <TypographyH1 className="col-span-full">Users</TypographyH1>

          <div className="mt-[16px] flex gap-[8px] justify-between items-center">
            <Input type="text" placeholder="Search" onChange={handleSearch} />
            <DrawerDialog
              trigger={
                <Button>
                  <PlusIcon className="mr-2 h-4 w-4" /> Add
                </Button>
              }
            />
          </div>
          <div className="mt-[16px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-[16px]">
            {/* User list / table */}
            {isGetUsersLoading ? (
              Array(6)
                .fill(null)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    className="rounded-lg h-[192px] w-full"
                  />
                ))
            ) : getUsersError ? (
              <>
                <p className="col-span-full">Something went wrong</p>
              </>
            ) : getUsersData ? (
              (debouncedKeyword
                ? getUsersData.filter(user => {
                    // Search using regex case insensitive
                    const regex = new RegExp(debouncedKeyword, "i");
                    if (regex.test(user.name) || regex.test(user.email))
                      return true;
                    return false;
                  })
                : getUsersData
              )?.map(user => {
                return (
                  <Card key={user.id} className="w-full">
                    <CardHeader className="p-[16px]">
                      <div className="flex flex-row items-center justify-end gap-[0px]">
                        <DrawerDialog
                          isUpdate={true}
                          trigger={
                            <Button
                              size="icon"
                              variant="ghost"
                              className="w-[32px] h-[32px] aspect-square"
                            >
                              <PencilLineIcon className="w-[16px]" />
                            </Button>
                          }
                          initialData={user}
                        />
                        <Dialog
                          open={isDeleteDialogOpen}
                          onOpenChange={setDeleteDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="w-[32px] h-[32px] aspect-square text-destructive hover:text-destructive"
                            >
                              <TrashIcon className="w-[16px]" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. Are you sure you
                                want to permanently delete this user?
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                type="submit"
                                variant="destructive"
                                onClick={() => handleDelete(user.id)}
                              >
                                {isDeleteUserLoading && (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Confirm
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-[16px] items-center overflow-hidden text-ellipsis">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }) ?? <p className="col-span-full">No users</p>
            ) : (
              <>
                <p className="col-span-full">No users</p>
              </>
            )}
            {/* end of User list / table */}
          </div>
        </div>
      </main>
    </>
  );
}
