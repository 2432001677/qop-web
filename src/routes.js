// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import BubbleChart from '@material-ui/icons/BubbleChart';
import Notifications from '@material-ui/icons/Notifications';
import AndroidIcon from '@material-ui/icons/Android';
// import Language from "@material-ui/icons/Language";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import Unarchive from "@material-ui/icons/Unarchive";
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.js';
import UserProfile from 'views/UserProfile/UserProfile.js';
import MyQuestionnaire from 'views/MyQuestionnaire/MyQuestionnaire.js';
// import TableList from 'views/TableList/TableList.js';
// import Icons from 'views/Icons/Icons.js';
import Groups from 'views/Group/Group.js';
import NotificationsPage from 'views/Notifications/Notifications.js';
// import Typography from "views/Typography/Typography.js";
import Maps from 'views/Maps/Maps.js';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: '问卷中心',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/user',
    name: '个人资料',
    icon: Person,
    component: UserProfile,
    layout: '/admin',
  },
  {
    path: '/questionnaire',
    name: '我的问卷',
    icon: 'content_paste',
    component: MyQuestionnaire,
    layout: '/admin',
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
    path: '/groups',
    name: '小组',
    icon: BubbleChart,
    component: Groups,
    layout: '/admin',
  },
  {
    path: '/analysis',
    name: '分析模型',
    icon: AndroidIcon,
    component: Maps,
    layout: '/admin',
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: Notifications,
    component: NotificationsPage,
    layout: '/admin',
  },
];

export default dashboardRoutes;
