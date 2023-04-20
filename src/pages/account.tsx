import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { getUser, supabase } from "../helpers/supabase";

const AccountPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { user } = await getUser();
      if (!user) {
        router.push("/");
      }
      setUser(user);
    })();
  }, []);

  const { id: userId, user_metadata } = user || {};
  const { name, job, profileImage } = user_metadata || {};

  useEffect(() => {
    (async () => {
      if (profileImage) {
        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(profileImage);
        setProfile(data.publicUrl);
      }
    })();
  }, [user]);

  if (!user) {
    return <div />;
  }

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const avatarFile = e.target.files[0];
    try {
      const { data } = await supabase.storage
        .from("avatars")
        .upload(`public/${userId}.png`, avatarFile, {
          upsert: true,
        });
      await supabase.auth.updateUser({ data: { profileImage: data.path } });
      const { user } = await getUser();
      setUser(user);
    } catch (err) {
      throw err;
    }
  };

  return (
    <Layout>
      <div className="bg-slate-900 h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-4 py-10 px-20 bg-white rounded">
          {profile ? (
            <img src={profile} className="rounded-full w-32 h-32" />
          ) : (
            <div className="flex justify-center items-center rounded-full w-32 h-32 bg-white text-black">
              Profile
            </div>
          )}
          <div className="flex flex-col justify-center items-center">
            <span className="text-3xl">{name}</span>
            <span className="text-2xl">{job}</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e)
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;
