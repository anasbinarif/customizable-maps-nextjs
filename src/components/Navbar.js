"use client";
import React, { useState, useLayoutEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
import MapIcon from "@mui/icons-material/Map";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import LoginSignupModal from "./LoginSignupModal";
import ChangePasswordModal from "./ChangePasswordModal"; // Import the modal component

const LinkStyles = {
  display: "block",
  textDecoration: "none",
  position: "relative",
  zIndex: 10,
};
const LinkBtn = {
  display: "flex",
  alignItems: "center",
  color: "#000",
  textDecoration: "none",
  borderRadius: "20px",
  padding: "0.5rem 1rem",
  transition: "all 0.5s ease-out",

  "&.selected": {
    // backgroundColor: "#000",
    color: "rgba(242,242,242,1)",

    "& svg": {
      color: "#fff",
    },
  },
};

export default function Navbar({ selected }) {
  const { data: session, status } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("login");
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const router = usePathname();
  const curPage = router.split("/")[router.split("/").length - 1];
  const linkRefs = useRef({});
  const [btnWidth, setBtnWidth] = useState(0);

  console.log(curPage);
  console.log(btnWidth);
  useLayoutEffect(() => {
    if (linkRefs.current[curPage]) {
      const currentWidth = linkRefs.current[curPage].offsetWidth;
      console.log(currentWidth);
      setBtnWidth(currentWidth);
    }
  }, [curPage, router.asPath]);

  const handleOpenModal = (mode) => {
    setModalMode(mode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    handleMenuClose();
    setLoading(false);
  };

  const handleChangePassword = () => {
    setChangePasswordOpen(true);
    handleMenuClose();
  };

  const handleSavePassword = async (currentPassword, newPassword) => {
    const res = await fetch("/api/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!res.ok) {
      throw new Error("Failed to change password");
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(242,242,242,1) 50%, rgba(255,255,255,1) 100%)",
          borderRadius: "20px",
          width: "auto",
          maxWidth: "95%",
          margin: "0rem auto",
          boxShadow: "none",
          top: "1rem",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          zIndex: 1100,
        }}
      >
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            padding: "0 !important",
            width: "100%",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 1rem",
              position: "relative",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "#333", fontWeight: "bold" }}
              >
                Customizable Maps
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexGrow: 1,
                gap: "1.5rem",
                alignItems: "center",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                transform: "translate(-50%, 0)",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "0.75rem",
                  bottom: "0.75rem",
                  left:
                    curPage === ""
                      ? 0
                      : curPage === "displayUserMap"
                      ? "50%"
                      : "86%",
                  transform: curPage !== "" ? "translate(-50%, 0)" : "",
                  width: btnWidth,
                  zIndex: 8,
                  borderRadius: "20px",
                  backgroundColor: "black",
                  transition: "all 0.3s ease-out",
                }}
              ></Box>
              <Link
                href="/"
                passHref
                style={LinkStyles}
                ref={(el) => (linkRefs.current[""] = el)}
              >
                <Button
                  sx={LinkBtn}
                  className={curPage === "" ? "selected" : ""}
                >
                  <HomeIcon
                    sx={{
                      marginRight: "0.5rem",
                      color: "#000",
                      width: curPage === "" ? "auto" : "0",
                      opacity: curPage === "" ? "1" : "0",
                      transition: "all 0.2s ease-out 0.1s",
                    }}
                  />
                  Home
                </Button>
              </Link>
              <Link
                href="/user/displayUserMap"
                passHref
                style={LinkStyles}
                ref={(el) => (linkRefs.current["displayUserMap"] = el)}
              >
                <Button
                  sx={LinkBtn}
                  className={curPage === "displayUserMap" ? "selected" : ""}
                >
                  <PinDropIcon
                    sx={{
                      marginRight: "0.5rem",
                      color: "#000",
                      width: curPage === "displayUserMap" ? "auto" : "0",
                      opacity: curPage === "displayUserMap" ? "1" : "0",
                      transition: "all 0.2s ease-out 0.1s",
                    }}
                  />
                  Your Maps
                </Button>
              </Link>
              <Link
                href="/user/createUserMaps"
                passHref
                style={LinkStyles}
                ref={(el) => (linkRefs.current["createUserMaps"] = el)}
              >
                <Button
                  sx={LinkBtn}
                  className={curPage === "createUserMaps" ? "selected" : ""}
                >
                  <MapIcon
                    sx={{
                      marginRight: "0.5rem",
                      color: "#000",
                      width: curPage === "createUserMaps" ? "auto" : "0",
                      opacity: curPage === "createUserMaps" ? "1" : "0",
                      transition: "all 0.2s ease-out 0.1s",
                    }}
                  />
                  Create
                </Button>
              </Link>
              {/* <Link href="/blogs" passHref style={LinkStyles}>
                <Button sx={LinkBtn}>
                  <ArticleIcon sx={{ marginRight: "0.5rem", color: "#000" }} />
                  Blogs
                </Button>
              </Link> */}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {status === "authenticated" ? (
                <>
                  <IconButton
                    onClick={handleMenu}
                    color="inherit"
                    sx={{ position: "relative", zIndex: 1500 }}
                  >
                    {session.user.image ? (
                      <Avatar
                        alt={session.user.name}
                        src={session.user.image}
                      />
                    ) : (
                      <AccountCircleIcon sx={{ color: "#000" }} />
                    )}
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    sx={{
                      position: "absolute",
                      "& .MuiPaper-root": {
                        borderRadius: "16px",
                      },
                      "& .MuiList-root": {
                        padding: 0,

                        "& .MuiMenuItem-root": {
                          lineHeight: 2,
                          "& .MuiTypography-root": {},
                        },
                      },
                    }}
                  >
                    <MenuItem disabled>
                      <Typography variant="subtitle1">
                        {session.user.email}
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleChangePassword}>
                      Change Password
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    sx={{ color: "#333", textTransform: "none" }}
                    onClick={() => handleOpenModal("login")}
                  >
                    Log In
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#000",
                      borderRadius: "10px",
                      padding: "0.5rem 1.5rem",
                      textTransform: "none",
                    }}
                    onClick={() => handleOpenModal("signup")}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <LoginSignupModal
        open={openModal}
        handleClose={handleCloseModal}
        mode={modalMode}
      />
      <ChangePasswordModal
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        onSave={handleSavePassword}
      />
      {loading && <LoadingSpinner />}
    </>
  );
}
