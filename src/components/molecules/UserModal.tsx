import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/atoms/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/molecules/Dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/molecules/Drawer";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select";
import { Loader2, PlusIcon } from "lucide-react";
import {
  useCreateUser,
  useGetUsers,
  useUpdateUser,
} from "@/modules/gorest/gorest.hooks";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import {
  Button as ButtonAntd,
  Modal,
  Modal as ModalAntd,
  Input as InputAntd,
  Form as FormAntd,
  Select as SelectAntd,
  message,
} from "antd";

export function UserModal({
  isUpdate = false,
  initialData = {},
  isOpen = false,
  setIsOpen,
}: {
  isUpdate?: boolean;
  initialData?: any;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}) {
  const router = useRouter();

  if (isOpen && isUpdate) {
    const url = new URL(window.location.href);
    url.searchParams.set("id", initialData.id);
    router.replace(url.toString());
  }

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

  // const { toast } = useToast();

  const [messageApi, contextHolder] = message.useMessage();

  // const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (
  //     data.current.name &&
  //     data.current.email &&
  //     data.current.gender &&
  //     data.current.status
  //   ) {
  //     if (isUpdate) {
  //       try {
  //         await updateUser({ id: data.current.id, data: data.current });
  //         messageApi.open({
  //           type: "success",
  //           content: "User updated",
  //         });
  //         setIsOpen(false);
  //         getUsers();
  //       } catch (error) {
  //         messageApi.open({
  //           type: "error",
  //           content: "Update user failed",
  //         });
  //       }
  //     } else {
  //       try {
  //         await createUser(data.current as any);
  //         messageApi.open({
  //           type: "success",
  //           content: "User created",
  //         });
  //         data.current.name = "";
  //         data.current.email = "";
  //         data.current.gender = "";
  //         data.current.status = "";
  //         setIsOpen(false);
  //         getUsers();
  //       } catch (error) {
  //         messageApi.open({
  //           type: "error",
  //           content: "Create user failed",
  //         });
  //       }
  //     }
  //   }
  // };

  // const onNameChange = (value: string) => {
  //   data.current.name = value;
  // };
  // const onEmailChange = (value: string) => {
  //   data.current.email = value;
  // };
  // const onGenderChange = (value: any) => {
  //   data.current.gender = value;
  // };
  // const onStatusChange = (value: any) => {
  //   data.current.status = value;
  // };

  const [form] = FormAntd.useForm();

  const handleAfterOpenChange = (open: boolean) => {
    if (!open) {
      const url = new URL(window.location.href);
      url.searchParams.delete("id");
      router.replace(url.toString());
      form.resetFields();
    }
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  const onFinish = async (values: any) => {
    if (isUpdate) {
      try {
        values.id = data.current?.id;
        await updateUser({ id: values.id, data: values });
        messageApi.open({
          type: "success",
          content: "User updated",
        });
        setIsOpen(false);
        getUsers();
      } catch (error) {
        messageApi.open({
          type: "error",
          content: "Update user failed",
        });
      }
    } else {
      try {
        await createUser(values as any);
        messageApi.open({
          type: "success",
          content: "User created",
        });
        setIsOpen(false);
        getUsers();
      } catch (error) {
        messageApi.open({
          type: "error",
          content: "Create user failed",
        });
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={isUpdate ? "Update user" : "Add user"}
        afterOpenChange={handleAfterOpenChange}
        open={isOpen}
        onCancel={onCancel}
        footer={null}
        centered
      >
        <FormAntd form={form} onFinish={onFinish} layout="vertical">
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
            initialValue={data.current?.name}
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
            name="email"
            label="Email"
            required
            rules={[
              {
                required: true,
                message: "Email is required",
              },
              {
                pattern: new RegExp(
                  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
                ),
                message: "Email is not valid",
              },
            ]}
            validateDebounce={500}
            initialValue={data.current?.email}
          >
            <InputAntd
              type="email"
              id="email"
              placeholder="hello@world.com"
              onChange={event => {
                form.setFieldValue("email", event.target.value);
              }}
              value={form.getFieldValue("email")}
            />
          </FormAntd.Item>

          <FormAntd.Item
            name="gender"
            label="Gender"
            required
            rules={[
              {
                required: true,
                message: "Gender is required",
              },
            ]}
            validateDebounce={500}
            initialValue={data.current?.gender}
          >
            <SelectAntd
              placeholder="Select gender"
              onChange={value => {
                form.setFieldValue("gender", value);
              }}
              value={form.getFieldValue("gender")}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
          </FormAntd.Item>

          <FormAntd.Item
            name="status"
            label="Status"
            required
            rules={[
              {
                required: true,
                message: "Status is required",
              },
            ]}
            validateDebounce={500}
            initialValue={data.current?.status}
          >
            <SelectAntd
              onChange={value => {
                form.setFieldValue("status", value);
              }}
              value={form.getFieldValue("status")}
              placeholder="Select status"
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
            />
          </FormAntd.Item>

          <ButtonAntd
            htmlType="submit"
            type="primary"
            size="large"
            className="w-full"
            disabled={isCreateUserLoading || isUpdateUserLoading}
            loading={isCreateUserLoading || isUpdateUserLoading}
          >
            Save
          </ButtonAntd>
        </FormAntd>
      </Modal>
    </>
  );
}
