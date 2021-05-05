// @material-ui/icons
// import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Notifications from "@material-ui/icons/Notifications";
import AndroidIcon from "@material-ui/icons/Android";
// core components/views for Admin layout
import PassAnalysisPage from "views/Analysis/PassAnalysis.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import MyQuestionnaire from "views/MyQuestionnaire/MyQuestionnaire.js";
// import TableList from 'views/TableList/TableList.js';
import Groups from "views/Group/Group.js";
import MyNotificationsPage from "views/Notifications/MyNotifications.js";
// import Typography from "views/Typography/Typography.js";

const dashboardRoutes = [
  {
    path: "/questionnaire",
    name: "我的问卷",
    icon: "content_paste",
    component: MyQuestionnaire,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "个人资料",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  // {
  //   path: "/table",
  //   name: "我的问卷",
  //   rtlName: "قائمة الجدول",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  {
    path: "/groups",
    name: "小组",
    icon: BubbleChart,
    component: Groups,
    layout: "/admin",
  },
  {
    path: "/analysis",
    name: "分析模型",
    icon: AndroidIcon,
    component: PassAnalysisPage,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "通知管理",
    icon: Notifications,
    component: MyNotificationsPage,
    layout: "/admin",
  },
  {
    name: "问卷调查",
    layout: "/questionnaire",
  },
];

export default dashboardRoutes;
