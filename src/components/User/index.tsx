import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { getUser, signout } from "../../helpers/supabase";

type UserType = {
  className?: string;
};

const User = ({ className }: UserType) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const { user } = await getUser();
      setUser(user);
    })();
  }, []);

  const handleSignOut = async () => {
    try {
      await signout();
      toast.success("Signout Successfully!", {
        onOpen: () => {
          setTimeout(() => {
            router.reload();
          }, 1000);
        },
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    user && (
      <div className={classNames("relative text-lg", className)}>
        <Menu>
          <Menu.Button className="flex items-center space-x-2">
            <span className="text-white font-bold text-xl">{user.email}</span>
            <UserCircleIcon className="w-8 h-8 text-white" />
          </Menu.Button>
          <Menu.Items className="absolute flex flex-col right-0 mt-2 bg-white py-2 rounded space-y-2 w-3/4 shadow-lg">
            <Menu.Item>
              <Link
                href="/account"
                className="hover:bg-lime-500 px-2 mx-2 hover:text-white"
              >
                Account settings
              </Link>
            </Menu.Item>
            <Menu.Item>
              <span
                onClick={() => handleSignOut()}
                className="cursor-pointer hover:bg-lime-500 px-2 mx-2 hover:text-white"
              >
                Signout
              </span>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    )
  );
};

export default User;
