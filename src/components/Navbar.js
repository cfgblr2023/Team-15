import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import styles from "./Dropdown.module.css";
import { ListItem, ListItemButton, Divider } from "@mui/material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid success`,
    padding: "0 4px",
  },
}));

const divStyle = {
  height: "10vh",
};

export default function Navbar() {
  const [isCookie, setCookie] = useState(false);
  const [Isdrawer, setdrawer] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    checkcookie();
  }, [isCookie]);

  function checkcookie() {
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      if (c.substring(0, 5) === "token") {
        setCookie(true);
        return;
      }
    }
    setCookie(false);
  }

  function getcartproducts() {
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      if (c.substring(1, 5) === "cart") {
        return JSON.parse(c.substring(6)).length;
      }
    }
    return 0;
  }

  function handlelogout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    checkcookie();
    navigate("../");
  }

  function handleDrawer() {
    Isdrawer ? setdrawer(false) : setdrawer(true);
  }

  function handlecourses() {
    navigate("../mycourses");
  }

  return (
    <div className="navbar-area">
      {/* <!-- navbar top start --> */}

      <nav
        className="navbar navbar-area-1 navbar-area navbar-expand-lg"
        style={divStyle}
      >
        <div className="container nav-container">
          <div className="responsive-mobile-menu">
            <button
              className="menu toggle-btn d-block d-lg-none"
              data-target="#edumint_main_menu"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={handleDrawer}
            >
              <span className="icon-left"></span>
              <span className="icon-right"></span>
            </button>
          </div>
          <div className="logo">
            <Link to="../">
              <img
                src={require("../assets/img/header-logo.jpg")}
                width="50px"
                alt="img"
              />
            </Link>
          </div>
          {/* <div className="nav-right-part nav-right-part-mobile">
                        <a className="signin-btn" href="signin">Sign In</a>
                        <a className="btn btn-base" href="signup">Sign Up</a>
                    </div> */}
          <div className="collapse navbar-collapse" id="edumint_main_menu">
            <ul className="navbar-nav menu-open">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="../course">Course</Link>
              </li>
            </ul>
          </div>
          <div className="nav-right-part nav-right-part-desktop">
            {isCookie ? (
              <div className={styles.dropdown}>
                <a className={styles.dropbtn}>
                  <IconButton>
                    <AccountCircleIcon />
                  </IconButton>
                </a>
                <div className={styles.dropdown_content}>
                  <div onClick={handlelogout}>Logout</div>
                  <div onClick={handlecourses}>My courses</div>
                </div>
              </div>
            ) : (
              <>
                <Link className="signin-btn" to="../signin">
                  Sign In
                </Link>
                <Link className="btn btn-base" to="../signup">
                  Sign Up
                </Link>
              </>
            )}

            <IconButton
              aria-label="cart"
              href={isCookie ? "../cart" : "../signin"}
            >
              <StyledBadge badgeContent={getcartproducts()} color="success">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </div>
        </div>
      </nav>
      <Drawer
        sx={{
          width: "30vh",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "30vh",
            boxSizing: "border-box",
          },
        }}
        anchor="right"
        open={Isdrawer}
        onClose={handleDrawer}
      >
        <>
          <ListItem disablePadding>
            <ListItemButton>
              <Link to="/">Home</Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Link to="../course">Course</Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Link to="../about">About us</Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Link to="../contact">Contact Us</Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Link to="../applynow">Apply Now</Link>
            </ListItemButton>
          </ListItem>
          <Divider />
          {isCookie ? (
            <>
              <ListItem disablePadding>
                <ListItemButton>
                  <div onClick={handlelogout}>Logout</div>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <div onClick={handlecourses}>My courses</div>
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem disablePadding>
                <ListItemButton>
                  <Link to="../signin">Sign In</Link>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <Link to="../signup">Sign Up</Link>
                </ListItemButton>
              </ListItem>
            </>
          )}
          <ListItem disablePadding>
            <ListItemButton>
              <Link to={isCookie ? "../cart" : "../signin"}>Cart</Link>
            </ListItemButton>
          </ListItem>
        </>
      </Drawer>
    </div>
  );
}
