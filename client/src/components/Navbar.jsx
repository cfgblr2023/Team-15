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
  const [isMentor, setIsMentor] = useState(false);
  const [isVolunteer, setIsVolunteer] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    checkcookie();
  }, [isCookie]);

  function checkcookie() {
    // console.log(arr)
    const token = localStorage.getItem("token");
    if (token !== null) setCookie(true);
    else setCookie(false);
    const type = localStorage.getItem("type");
    if (type === "volunteer") setIsVolunteer(true);
    if (type === "mentor") setIsMentor(true);
  }

  // const cookie=JSON.parse(ca);
  // console.log(cookie)
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     if (c.substring(0, 5) === "token") {
  //       setCookie(true);
  //       return;
  //     }
  //   }
  //   setCookie(false);
  // }

  function handlelogout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "type=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
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
                src={require("../assets/img/logofinal.jpg")}
                width="50px"
                alt="img"
              />
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="edumint_main_menu">
            <ul className="navbar-nav menu-open">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="../course">Course</Link>
              </li>

              {isVolunteer && (
                <>
                <li>
                  <Link to="../raiseFund">Raise Fund</Link>
                </li>
                <li>
                  <Link to="../eventOrg">Event Organise</Link>
                </li>
                <li>
                  <Link to="../tieUp">Tie Ups</Link>
                </li>
                <li>
                  <Link to="../collectStuff">Collect Non-Monetary Items</Link>
                </li>
                </>
                
              )}

              {isMentor && (
                <li>
                  (<Link to="../addCourse">Add course</Link>)
                </li>
              )}
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
