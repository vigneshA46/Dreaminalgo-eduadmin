import { ActionIcon, Box, Flex, Group, Image, Text, ThemeIcon } from "@mantine/core";
import {
  IconGauge,
  IconChartLine,
  IconCreditCard,
  IconFileText,
  IconPlus,
  IconAntenna,
  IconUser,
  IconMenu2,
  IconCoinRupee,
  IconBook,
  IconUsers,
  IconChartDots,
  IconBuildingBank,
  IconActivity,
  IconReportAnalytics,
  IconBook2,
  IconBell,
  IconSettings,
  IconCodePlus,
  IconWaveSine,
  IconCurrencyRupee,
  IconSchool,
  IconShieldLock,
  IconClockExclamation,
  IconLogout,
} from "@tabler/icons-react";
import classes from "./Sidebar.module.css";
import logobgrem from "../assets/logobgrem.png"
import { useState } from "react";
import { useAdmin } from "../context/AdminContext";


const menu = [
  { label: "Dashboard", icon: IconGauge },
  { label: "Notification", icon: IconBell },
  { label: "Courses", icon: IconBook2 },
  { label: "Announcements", icon: IconClockExclamation },
  { label: "Add course", icon: IconPlus },
  { label: "Users", icon: IconUsers },
  { label: "Reports", icon: IconReportAnalytics },
  { label: "Admin", icon: IconShieldLock },
];

export default function Sidebar({ active, onSelect, mobileOpen, setMobileOpen, collapsed, setCollapsed }) {

  
  const {logout} = useAdmin();

/* const [collapsed, setCollapsed] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false); */

const toggleSidebar = () => {
  if (window.innerWidth <= 768) {
    setMobileOpen(!mobileOpen);
  } else {
    setCollapsed(!collapsed);
  }
};
  return (
<>
  {mobileOpen && (
    <div
      className={classes.overlay}
      onClick={() => setMobileOpen(false)}
    />
  )}
  <Box
    
    className={`${classes.sidebar} 
      ${collapsed ? classes.collapsed : ''} 
      ${mobileOpen ? classes.mobileOpen : ''}`}
  >
    {/* header */}
    <Flex align="center" justify="space-between" className={classes.header}>
      <Flex
        align="center"
        justify="center"
        gap="sm"
        direction={collapsed ? "column" : "row"}
      >
        <Image src={logobgrem} bg={"#000"} alt="loading logo" w="2.8rem" radius="1rem" />

        <ActionIcon onClick={toggleSidebar} variant="subtle" className={classes.hamburgerInside}>
  <IconMenu2 size={22} color="black" />
     </ActionIcon>
      </Flex>
    </Flex>

    {/* menu */}
    <Box className={classes.menu}>
      {menu.map((item, i) => (
        <Box
          key={i}
          className={`${classes.menuItem} ${active === i ? classes.active : ""}`}
          onClick={() => {
            onSelect(i);
            setMobileOpen(false); // auto close if mobile
          }}
        >
          <item.icon size={22} />
          {!collapsed && <Text ml="sm">{item.label}</Text>}
        </Box>
      ))}
       <Box

          className={classes.menuItem}
          onClick={() => {
            setMobileOpen(false); 
            logout();
          }}
        >
          <IconLogout color="red" size={22} />
          {!collapsed && <Text ml="sm">logout</Text>}
        </Box>
    </Box>
  </Box>

  {/* overlay - OUTSIDE SIDEBAR */}

</>

  );
}
