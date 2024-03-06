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
  Form as FormAntd,
  message,
  Tabs,
} from "antd";
import { UserModal } from "@/components/molecules/UserModal";
import { UpdateUserModal } from "@/components/molecules/UpdateUserModal";
import type { RadioChangeEvent } from "antd";
import { Radio as RadioAntd, Table as TableAntd } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { Student, useStudentStore } from "@/app/student/store/studentStore";

export default function StudentPage() {
  // const { isGetUsersLoading, getUsersError, getUsersData, getUsers } =
  //   useGetUsers({
  //     page: 1,
  //     per_page: 36,
  //   });

  // const { toast } = useToast();

  const [debouncedKeyword, updateDebouncedKeyword] = useDebounceValue("", 500);

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   updateDebouncedKeyword(e.target.value);
  // };

  // const { deleteUser, isDeleteUserLoading } = useDeleteUser();

  const [messageApi, contextHolder] = message.useMessage();

  // const handleDelete = async (id: Gorest.User["id"]) => {
  //   try {
  //     await deleteUser(id);
  //     // toast({
  //     //   title: "User deleted",
  //     // });
  //     messageApi.open({
  //       type: "info",
  //       content: "User deleted",
  //     });
  //     getUsers();
  //   } catch (error) {
  //     // toast({
  //     //   title: "Delete user failed",
  //     //   variant: "destructive",
  //     // });
  //     messageApi.open({
  //       type: "error",
  //       content: "Delete user failed",
  //     });
  //   }
  // };

  // const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  const { confirm } = ModalAntd;

  const router = useRouter();
  const searchParams = useSearchParams();

  type ViewMode = "List" | "Table";
  const DEFAULT_VIEW_MODE: ViewMode = "Table";
  const [viewMode, setViewMode] = useState<ViewMode>(
    (searchParams.get("slv") as ViewMode) ?? DEFAULT_VIEW_MODE
  );

  useEffect(() => {
    if (searchParams.get("slv") === DEFAULT_VIEW_MODE) {
      const url = new URL(window.location.href);
      url.searchParams.delete("slv");
      router.replace(url.toString());
    }
    setViewMode((searchParams.get("slv") as ViewMode) ?? DEFAULT_VIEW_MODE);
  }, [searchParams.get("slv")]);

  type Tab = `${Student["type_class"]}`;
  const DEFAULT_ACTIVE_TAB: Tab = "1";
  const [activeTab, setActiveTab] = useState<Tab>(
    (searchParams.get("t") as Tab) ?? DEFAULT_ACTIVE_TAB
  );

  useEffect(() => {
    if (searchParams.get("t") === DEFAULT_ACTIVE_TAB) {
      const url = new URL(window.location.href);
      url.searchParams.delete("t");
      router.replace(url.toString());
    }
    setActiveTab((searchParams.get("t") as Tab) ?? DEFAULT_ACTIVE_TAB);
  }, [searchParams.get("t")]);

  const [form] = FormAntd.useForm();

  const students = useStudentStore(state => state.students);
  const addStudent = useStudentStore(state => state.add);
  const currentStudents = students.filter(
    stud => stud.type_class === Number(activeTab)
  );

  const handleOnFinish = (
    values: Record<keyof Pick<Student, "name" | "address">, string>
  ) => {
    const newStudent: Student = {
      name: values.name,
      address: values.address,
      type_class: Number(activeTab),
    };

    addStudent(newStudent);

    messageApi.success({
      content: "Student added",
      type: "success",
    });
  };

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
          <TypographyH1 className="col-span-full">Students</TypographyH1>

          <Tabs
            defaultActiveKey={activeTab}
            centered
            onChange={activeKey => {
              const url = new URL(window.location.href);
              url.searchParams.set("t", activeKey);
              router.replace(url.toString());
            }}
            items={new Array(3).fill(null).map((_, i) => {
              const id = String(i + 1);
              return {
                label: `Class ${id}`,
                key: id,
                children: (
                  <>
                    {/* <div className="flex justify-center w-full self-stretch"> */}
                    <FormAntd
                      form={form}
                      layout="vertical"
                      className="w-full"
                      // rootClassName="max-w-[512px] border w-full"
                      onFinish={handleOnFinish}
                    >
                      <FormAntd.Item
                        name="name"
                        label="Name"
                        required
                        rules={[
                          {
                            required: true,
                            message: "Name is required",
                          },
                          {
                            max: 1000,
                            message: `Name max 1000 characters`,
                          },
                        ]}
                        validateDebounce={500}
                      >
                        <InputAntd
                          placeholder="Name"
                          type="text"
                          id="name"
                          onChange={event => {
                            form.setFieldValue("name", event.target.value);
                          }}
                          value={form.getFieldValue("name")}
                        />
                      </FormAntd.Item>

                      <FormAntd.Item
                        name="address"
                        label="Address"
                        required
                        rules={[
                          {
                            required: true,
                            message: "Address is required",
                          },
                          {
                            max: 5000,
                            message: `Name max 5000 characters`,
                          },
                        ]}
                        validateDebounce={500}
                      >
                        <InputAntd
                          type="text"
                          id="address"
                          placeholder="Your address"
                          onChange={event => {
                            form.setFieldValue("address", event.target.value);
                          }}
                          value={form.getFieldValue("address")}
                        />
                      </FormAntd.Item>

                      <ButtonAntd
                        htmlType="submit"
                        type="primary"
                        size="large"
                        className="w-full"
                      >
                        Save
                      </ButtonAntd>
                    </FormAntd>
                    {/* </div> */}

                    {viewMode === "List" ? (
                      <div className="mt-[16px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-[16px]">
                        {/* User list / table */}
                        {(debouncedKeyword
                          ? currentStudents.filter(user => {
                              // Search using regex case insensitive
                              const regex = new RegExp(debouncedKeyword, "i");
                              if (
                                regex.test(user.name) ||
                                regex.test(user.address)
                              )
                                return true;
                              return false;
                            })
                          : currentStudents
                        )?.map((user, index) => {
                          return (
                            <CardAntd
                              size="small"
                              key={index}
                              className="w-full"
                            >
                              <ProfileCard
                                title={user.name}
                                subTitle={user.address}
                                avatarSrc="https://github.com/shadcn.png"
                              />
                            </CardAntd>
                          );
                        })}
                        {/* end of User list / table */}
                      </div>
                    ) : (
                      <div className="mt-[16px]">
                        <TableAntd
                          sticky={{ offsetHeader: 56 }}
                          scroll={{ x: 768 }}
                          columns={[
                            {
                              title: "Name",
                              dataIndex: "name",
                              key: "name",
                              sorter: (a, b) => {
                                if (a.name > b.name) return 1;
                                else if (a.name < b.name) return -1;
                                else return 0;
                              },
                            },
                            {
                              title: "Address",
                              dataIndex: "address",
                              key: "address",
                              sorter: (a, b) => {
                                if (a.address > b.address) return 1;
                                else if (a.address < b.address) return -1;
                                else return 0;
                              },
                            },
                          ]}
                          dataSource={
                            debouncedKeyword
                              ? currentStudents?.filter(user => {
                                  // Search using regex case insensitive
                                  const regex = new RegExp(
                                    debouncedKeyword,
                                    "i"
                                  );
                                  if (
                                    regex.test(user.name) ||
                                    regex.test(user.address)
                                  )
                                    return true;
                                  return false;
                                })
                              : currentStudents
                          }
                          pagination={false}
                        />
                      </div>
                    )}
                  </>
                ),
              };
            })}
          />

          {/* 
          <div className="mt-[16px] flex gap-[8px] justify-between items-center">
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
          </div> */}

          {/* <div className="flex mt-[16px]">
            <RadioAntd.Group
              options={[
                { label: "List", value: "List" },
                { label: "Table", value: "Table" },
              ]}
              onChange={event => {
                const url = new URL(window.location.href);
                url.searchParams.set("slv", event.target.value);
                router.replace(url.toString());
                // setViewMode(event.target.value);
              }}
              value={viewMode}
              optionType="button"
              className="shrink-0"
            />
          </div> */}
        </div>
      </main>
    </>
  );
}
