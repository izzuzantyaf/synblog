"use client";
import { Navbar } from "@/components/organisms/Navbar";
import { TypographyH1 } from "@/components/atoms/TypographyH1";
import { Button } from "@/components/atoms/Button";
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
} from "@/components/molecules/Card";
import { Avatar, AvatarImage } from "@/components/atoms/Avatar";
import { Skeleton } from "@/components/atoms/Skeleton";
import { DrawerDialog } from "@/components/molecules/DrawerDialog";
import { Input } from "@/components/atoms/Input";
import { useDebounceValue } from "usehooks-ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/molecules/Dialog";
import { useToast } from "@/hooks/useToast";
import { useEffect, useRef, useState } from "react";
import BackButton from "@/components/atoms/BackButton";
import ProfileCard from "@/components/molecules/ProfileCard";
import {
  Input as InputAntd,
  Button as ButtonAntd,
  Modal as ModalAntd,
  Card as CardAntd,
  message,
  Badge,
} from "antd";
import { UserModal } from "@/components/molecules/UserModal";
import { UpdateUserModal } from "@/components/molecules/UpdateUserModal";
import type { RadioChangeEvent } from "antd";
import { Radio as RadioAntd, Table as TableAntd } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

export default function UserPage() {
  const { isGetUsersLoading, getUsersError, getUsersData, getUsers } =
    useGetUsers({
      page: 1,
      per_page: 36,
    });

  const { toast } = useToast();

  const [debouncedKeyword, updateDebouncedKeyword] = useDebounceValue("", 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDebouncedKeyword(e.target.value);
  };

  const { deleteUser, isDeleteUserLoading } = useDeleteUser();

  const [messageApi, contextHolder] = message.useMessage();

  const handleDelete = async (id: Gorest.User["id"]) => {
    try {
      await deleteUser(id);
      // toast({
      //   title: "User deleted",
      // });
      messageApi.open({
        type: "info",
        content: "User deleted",
      });
      getUsers();
    } catch (error) {
      // toast({
      //   title: "Delete user failed",
      //   variant: "destructive",
      // });
      messageApi.open({
        type: "error",
        content: "Delete user failed",
      });
    }
  };

  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  const { confirm } = ModalAntd;

  const router = useRouter();
  const searchParams = useSearchParams();

  type ViewMode = "List" | "Table";
  const [viewMode, setViewMode] = useState<ViewMode>(
    (searchParams.get("ulv") as ViewMode) ?? "List"
  );

  useEffect(() => {
    if (searchParams.get("ulv") === "List") {
      const url = new URL(window.location.href);
      url.searchParams.delete("ulv");
      router.replace(url.toString());
    }
    setViewMode((searchParams.get("ulv") as ViewMode) ?? "List");
  }, [searchParams.get("ulv")]);

  return (
    <>
      {contextHolder}
      <main>
        {/* Navbar */}
        <Navbar />
        {/* end of Navbar */}

        <div className="px-[16px] pb-0 max-w-screen-lg mx-auto">
          <BackButton />
        </div>

        <div className="p-[16px] pt-0 mt-[16px] max-w-screen-lg mx-auto ">
          <TypographyH1 className="col-span-full">Users</TypographyH1>

          <div className="mt-[16px] flex gap-[8px] justify-between items-center">
            {/* <Input type="text" placeholder="Search" onChange={handleSearch} /> */}
            <InputAntd
              type="search"
              placeholder="Search"
              onChange={handleSearch}
              size="large"
            />

            <ButtonAntd
              icon={<PlusIcon />}
              type="primary"
              size="large"
              rootClassName="flex items-center"
              className="!flex !items-center"
              onClick={() => setIsCreateUserModalOpen(true)}
            >
              Add
            </ButtonAntd>

            <UserModal
              isUpdate={false}
              isOpen={isCreateUserModalOpen}
              setIsOpen={open => {
                setIsCreateUserModalOpen(open);
              }}
            />
          </div>

          <div className="flex mt-[16px]">
            <RadioAntd.Group
              options={[
                { label: "List", value: "List" },
                { label: "Table", value: "Table" },
              ]}
              onChange={event => {
                const url = new URL(window.location.href);
                url.searchParams.set("ulv", event.target.value);
                router.replace(url.toString());
                // setViewMode(event.target.value);
              }}
              value={viewMode}
              optionType="button"
              className="shrink-0"
            />
          </div>

          {
            {
              List: (
                <>
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
                          <CardAntd
                            size="small"
                            key={user.id}
                            className="w-full"
                            extra={
                              <div className="flex flex-row items-center justify-end gap-[0px]">
                                <UpdateUserModal user={user} />

                                <ButtonAntd
                                  icon={<TrashIcon className="w-[16px]" />}
                                  type="text"
                                  danger
                                  onClick={() => {
                                    confirm({
                                      title: "Are you sure delete this user?",
                                      content: (
                                        <>
                                          <p>{user.name}</p>
                                          <p>{user.email}</p>
                                        </>
                                      ),
                                      icon: null,
                                      okText: "Delete",
                                      okType: "danger",
                                      cancelText: "Cancel",
                                      cancelButtonProps: {
                                        type: "text",
                                      },
                                      onOk() {
                                        return new Promise(
                                          async (resolve, reject) => {
                                            const res = await handleDelete(
                                              user.id
                                            );
                                            resolve(res);
                                          }
                                        );
                                      },
                                      onCancel() {},
                                    });
                                  }}
                                ></ButtonAntd>
                              </div>
                            }
                          >
                            <ProfileCard
                              title={user.name}
                              subTitle={user.email}
                              avatarSrc="https://github.com/shadcn.png"
                            />
                          </CardAntd>
                        );
                      }) ?? <p className="col-span-full">No users</p>
                    ) : (
                      <>
                        <p className="col-span-full">No users</p>
                      </>
                    )}
                    {/* end of User list / table */}
                  </div>
                </>
              ),
              Table: (
                <>
                  <div className="mt-[16px]">
                    <TableAntd
                      sticky={{ offsetHeader: 56 }}
                      scroll={{ x: 768 }}
                      columns={[
                        {
                          title: "ID",
                          dataIndex: "id",
                          sorter: (a, b) => {
                            if (a.id > b.id) return 1;
                            else if (a.id < b.id) return -1;
                            else return 0;
                          },
                        },
                        {
                          title: "Name",
                          dataIndex: "name",
                          sorter: (a, b) => {
                            if (a.name > b.name) return 1;
                            else if (a.name < b.name) return -1;
                            else return 0;
                          },
                        },
                        {
                          title: "Email",
                          dataIndex: "email",
                          sorter: (a, b) => {
                            if (a.email > b.email) return 1;
                            else if (a.email < b.email) return -1;
                            else return 0;
                          },
                        },
                        {
                          title: "Gender",
                          dataIndex: "gender",
                        },
                        {
                          title: "Status",
                          dataIndex: "status",
                          render: (_, record) => {
                            if (record.status === "active")
                              return (
                                <span className="text-green-600">
                                  {record.status}
                                </span>
                              );
                            return <span>{record.status}</span>;
                          },
                        },
                        {
                          title: "Action",
                          dataIndex: "action",
                          fixed: "right",
                          width: 100,
                          render: (_, record, index) => (
                            <div key={index} className="flex gap-[8px]">
                              <UpdateUserModal user={record} />

                              <ButtonAntd
                                icon={<TrashIcon className="w-[16px]" />}
                                type="text"
                                danger
                                onClick={() => {
                                  confirm({
                                    title: "Are you sure delete this user?",
                                    content: (
                                      <>
                                        <p>{record.name}</p>
                                        <p>{record.email}</p>
                                      </>
                                    ),
                                    icon: null,
                                    okText: "Delete",
                                    okType: "danger",
                                    cancelText: "Cancel",
                                    cancelButtonProps: {
                                      type: "text",
                                    },
                                    onOk() {
                                      return new Promise(
                                        async (resolve, reject) => {
                                          const res = await handleDelete(
                                            record.id
                                          );
                                          resolve(res);
                                        }
                                      );
                                    },
                                    onCancel() {},
                                  });
                                }}
                              ></ButtonAntd>
                            </div>
                          ),
                        },
                      ]}
                      dataSource={
                        debouncedKeyword
                          ? getUsersData?.filter(user => {
                              // Search using regex case insensitive
                              const regex = new RegExp(debouncedKeyword, "i");
                              if (
                                regex.test(user.name) ||
                                regex.test(user.email)
                              )
                                return true;
                              return false;
                            })
                          : getUsersData
                      }
                      pagination={false}
                    />
                  </div>
                </>
              ),
            }[viewMode]
          }
        </div>
      </main>
    </>
  );
}
