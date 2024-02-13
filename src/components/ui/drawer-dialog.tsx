import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, PlusIcon } from "lucide-react";
import {
  useCreateUser,
  useGetUsers,
  useUpdateUser,
} from "@/modules/gorest/gorest.hooks";
import { useToast } from "@/components/ui/use-toast";

export function DrawerDialog({
  isUpdate = false,
  initialData = {},
  trigger,
}: {
  isUpdate?: boolean;
  initialData?: any;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { createUser, isCreateUserLoading, createUserData, createUserError } =
    useCreateUser();
  const { updateUser, isUpdateUserLoading, updateUserData, updateUserError } =
    useUpdateUser();
  const { getUsers } = useGetUsers();

  const data = React.useRef(
    isUpdate
      ? initialData
      : {
          name: "",
          email: "",
          gender: "",
          status: "",
        }
  );

  const { toast } = useToast();

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      data.current.name &&
      data.current.email &&
      data.current.gender &&
      data.current.status
    ) {
      if (isUpdate) {
        await updateUser({ id: data.current.id, data: data.current as any })
          .then(() => {
            toast({
              title: "User updated",
            });
            setOpen(false);
            getUsers();
          })
          .catch(() => {
            toast({
              title: "Update user failed",
              variant: "destructive",
            });
          });
      } else {
        await createUser(data.current as any)
          .then(() => {
            toast({
              title: "User created",
            });
            data.current.name = "";
            data.current.email = "";
            data.current.gender = "";
            data.current.status = "";
            setOpen(false);
            getUsers();
          })
          .catch(() => {
            toast({
              title: "Create user failed",
              variant: "destructive",
            });
          });
      }
    }
  };

  const onNameChange = (value: string) => {
    data.current.name = value;
  };
  const onEmailChange = (value: string) => {
    data.current.email = value;
  };
  const onGenderChange = (value: any) => {
    data.current.gender = value;
  };
  const onStatusChange = (value: any) => {
    data.current.status = value;
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add user</DialogTitle>
            <DialogDescription>
              Fill your profile and then click save.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm
            onSubmit={handleOnSubmit}
            isCreateUserLoading={isCreateUserLoading}
            isUpdateUserLoading={isUpdateUserLoading}
            onNameChange={onNameChange}
            onEmailChange={onEmailChange}
            onGenderChange={onGenderChange}
            onStatusChange={onStatusChange}
            user={data.current}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add user</DrawerTitle>
          <DrawerDescription>
            Fill your profile and then click save.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm
          className="px-4"
          onSubmit={handleOnSubmit}
          isCreateUserLoading={isCreateUserLoading}
          isUpdateUserLoading={isUpdateUserLoading}
          onNameChange={onNameChange}
          onEmailChange={onEmailChange}
          onGenderChange={onGenderChange}
          onStatusChange={onStatusChange}
          user={data.current}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({
  className,
  onSubmit,
  isCreateUserLoading,
  isUpdateUserLoading,
  onNameChange,
  onEmailChange,
  onGenderChange,
  onStatusChange,
  user = {},
}: React.ComponentProps<"form"> & {
  isCreateUserLoading: boolean;
  isUpdateUserLoading: boolean;
  onNameChange: (...arg: any) => void;
  onEmailChange: (...arg: any) => void;
  onGenderChange: (...arg: any) => void;
  onStatusChange: (...arg: any) => void;
  user?: any;
}) {
  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={onSubmit}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="Name"
          onChange={event => {
            onNameChange(event.target.value);
          }}
          defaultValue={user?.name}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="hello@world.com"
          onChange={event => {
            onEmailChange(event.target.value);
          }}
          defaultValue={user?.email}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="gender">Gender</Label>
        <Select
          onValueChange={value => {
            onGenderChange(value);
          }}
          defaultValue={user?.gender}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <Select
          onValueChange={value => {
            onStatusChange(value);
          }}
          defaultValue={user?.status}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isCreateUserLoading}>
        {(isCreateUserLoading || isUpdateUserLoading) && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Save
      </Button>
    </form>
  );
}
