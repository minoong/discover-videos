import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { magic } from "~/lib/magic-client";
import styles from "../../styles/Login.module.css";

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [userMsg, setUserMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleLoginWithEmail = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isLoading) return;
    setIsLoading(true);
    e.preventDefault();
    console.log("hi button");

    if (email && magic) {
      if (email === "alsdndjdrktl@gmail.com") {
        try {
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });
          console.log({ didToken });

          if (didToken) {
            router.push("/");
          }

          //   {
          //     "didToken": "WyIweDgxZmNkZmFlMTMyNGNiNjMxNTg5NThjOWYwNWQ0YzVmY2U4Mjc3OTA1M2I2NmFiNzJhNmYyNzIwYTc0MjhkZDA0MmIyYzljYTA5ZTVmN2JiZDIyNWNjYzRhNTdjYjcyNjQxZjlmZDI5MmUzZjNmZTJhMGJkYzM0MzRlZjBmMTI0MWMiLCJ7XCJpYXRcIjoxNjY0MTk4MTY1LFwiZXh0XCI6MTY2NDE5OTA2NSxcImlzc1wiOlwiZGlkOmV0aHI6MHhGNENkODI3YjRjQzVlMTczOENGZTRCNTlFOUMwQzA5N2U4N0RBNzNBXCIsXCJzdWJcIjpcImtmcHhrT2VmQTFtYTlhNFNIQjgyT2tzNTNURU5lWUl1NXlIdTBsa3UtS1U9XCIsXCJhdWRcIjpcInM5bEllaGlUSGRaN0szU1JnVU95Yjd0eW0wUm40MzIydWFOXy1OS19RUXc9XCIsXCJuYmZcIjoxNjY0MTk4MTY1LFwidGlkXCI6XCJhOWIyNmQ5Mi03MGI4LTQ3YzAtYTgyZi05NzY3ZjQ4YTI0ZTlcIixcImFkZFwiOlwiMHhmZWIwYzM3NzEwZDMwODU4NjQ5M2U2ZWMyYWYwYzdkMDEyMzRmZTVkZjAxNGM5ZmQ1YWNhZGNmZGI3MTY5NGUyNDAwNTRjZGEwNjVjNjZkOTNjY2Q0MTA3YWQ2OTg4ZjhmMTUyNGUzYTg4ZTI2YWZlMTdmYzAzMDY4MjM4ZjY1MDFiXCJ9Il0="
          // }
        } catch (error) {
          // Handle errors if required!
          console.error("Something went wrong logging in", error);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setUserMsg("Something went wrong logging in");
      }
    } else {
      setIsLoading(false);
      // show user message
      setUserMsg("Enter a valid email address");
    }
  };

  const handleOnChnageEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserMsg("");
      const email = e.target.value;

      setEmail(email);
    },
    []
  );
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/">
            <a>
              <div className={styles.logoWrapper}>
                <Image
                  src="/static/netflix.svg"
                  alt="Netflix logo"
                  width="128px"
                  height="34px"
                />
              </div>
            </a>
          </Link>
        </div>

        <main className={styles.main}>
          <div className={styles.mainWrapper}>
            <h1 className={styles.signinHeader}>Sign In</h1>

            <input
              type="text"
              placeholder="Email address"
              className={styles.emailInput}
              onChange={handleOnChnageEmail}
            />

            {userMsg && <p className={styles.userMsg}>{userMsg}</p>}

            <button
              onClick={handleLoginWithEmail}
              className={styles.loginBtn}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </button>
          </div>
        </main>
      </header>
    </div>
  );
};

export default Login;
