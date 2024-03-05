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
    router.replace(`/user?id=${initialData.id}`);
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

  const { toast } = useToast();

  const [messageApi, contextHolder] = message.useMessage();

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
            // toast({
            //   title: "User updated",
            // });
            messageApi.open({
              type: "success",
              content: "User updated",
            });
            setIsOpen(false);
            getUsers();
          })
          .catch(() => {
            // toast({
            //   title: "Update user failed",
            //   variant: "destructive",
            // });
            messageApi.open({
              type: "error",
              content: "Update user failed",
            });
          });
      } else {
        await createUser(data.current as any)
          .then(() => {
            // toast({
            //   title: "User created",
            // });
            messageApi.open({
              type: "success",
              content: "User created",
            });
            data.current.name = "";
            data.current.email = "";
            data.current.gender = "";
            data.current.status = "";
            setIsOpen(false);
            getUsers();
          })
          .catch(() => {
            // toast({
            //   title: "Create user failed",
            //   variant: "destructive",
            // });
            messageApi.open({
              type: "error",
              content: "Create user failed",
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

  return (
    <>
      {contextHolder}
      <Modal
        title={isUpdate ? "Update user" : "Add user"}
        afterOpenChange={open => {
          if (!open) router.replace("/user");
        }}
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
        footer={null}
      >
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
      </Modal>
    </>
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
  onNameChange: (arg: any) => void;
  onEmailChange: (arg: any) => void;
  onGenderChange: (arg: any) => void;
  onStatusChange: (arg: any) => void;
  user?: any;
}) {
  return (
    <>
      <FormAntd
        className={cn("grid items-start", className)}
        // onSubmit={onSubmit}
        onSubmitCapture={onSubmit}
        layout="vertical"
      >
        <div className="grid gap-2">
          <FormAntd.Item label="Name">
            <InputAntd
              placeholder="Name"
              type="text"
              id="name"
              onChange={event => {
                onNameChange(event.target.value);
              }}
              defaultValue={user?.name}
            />
          </FormAntd.Item>
        </div>

        <div className="grid gap-2">
          <FormAntd.Item label="Email">
            <InputAntd
              type="email"
              id="email"
              placeholder="hello@world.com"
              onChange={event => {
                onEmailChange(event.target.value);
              }}
              defaultValue={user?.email}
            />
          </FormAntd.Item>
        </div>

        <div className="grid gap-2">
          <FormAntd.Item label="Gender">
            <SelectAntd
              placeholder="Select gender"
              defaultValue={user?.gender}
              onChange={value => {
                onGenderChange(value);
              }}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
          </FormAntd.Item>
        </div>

        <div className="grid gap-2">
          <FormAntd.Item label="Status">
            <SelectAntd
              onChange={value => {
                onStatusChange(value);
              }}
              defaultValue={user?.status}
              placeholder="Select status"
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
            />
          </FormAntd.Item>
        </div>

        <ButtonAntd
          htmlType="submit"
          type="primary"
          size="large"
          disabled={isCreateUserLoading || isUpdateUserLoading}
          loading={isCreateUserLoading || isUpdateUserLoading}
        >
          Save
        </ButtonAntd>
      </FormAntd>
    </>
  );
}
