"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { redirect } from "next/dist/client/components/navigation";

export default function Home() {

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const res = await fetch("/api/auth/session");
  //     const session = await res.json();
  //     if (!session.user) {
  //       redirect("/login");
  //     }
  //     redirect("/dashboard");
  //   };

  //   fetchSession();
  // }, []);

  useEffect(() => {
    // get session from next-auth
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      if (!session.user) {
        console.log("No user session found. Redirecting to /login");
      } else {
        console.log("User session found. Redirecting to /dashboard");
      }
    };

    fetchSession();
  }, []);

  return (
    <Box>
      <Typography variant="h5">Welcome to the Home Page</Typography>
    </Box>
  );
}