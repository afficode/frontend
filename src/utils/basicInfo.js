import { TbActivityHeartbeat } from 'react-icons/tb';
import { AiFillShop, AiFillSetting } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';
import { ImProfile } from 'react-icons/im';
import { FaSignOutAlt, FaWalking, FaEye } from 'react-icons/fa';
import { FcPrivacy } from 'react-icons/fc';
import { GrConnect } from 'react-icons/gr';
import { IoMdHelpCircle, IoIosBookmarks } from 'react-icons/io';
import { MdAirplanemodeInactive, MdFeaturedPlayList, MdSettingsInputComponent, MdAdminPanelSettings } from 'react-icons/md';
import { RiUserSettingsFill, RiMailSettingsFill, RiListSettingsLine } from 'react-icons/ri';

export const dashboardOption = [
    {
        id: 1,
        name: "Activities",
        icon: <TbActivityHeartbeat />,
        link: "/dashboard/activities"
    },{
        id: 2,
        name: "Profile",
        icon: <ImProfile />,
        link: "/dashboard/profile"
    },{
        id: 3,
        name: "My Shop",
        icon: <AiFillShop />,
        link: "/dashboard/myshop"
    },{
        id: 4,
        name: "Settings",
        icon: <AiFillSetting />,
        link: "/setting"
    },{
        id: 5,
        name: "Privacy / Policy",
        icon: <FcPrivacy />,
        link: "/dashboard/privacy"
    },{
        id: 6,
        name: "Help",
        icon: <IoMdHelpCircle />,
        link: "/dashboard/help"
    },{
        id: 7,
        name: "Logout",
        icon: <FaSignOutAlt />,
        link: "/logout"
    },{
        id: 8,
        name: "Deactivate Account",
        icon: <MdAirplanemodeInactive />,
        link: "/dashboard/deactivateAccount"
    },
]

export const activitiesSummary = [
    {
        title: "Post this month",
        post: 73,
        color: "green",
        icon: <MdFeaturedPlayList />,
        colorWeight: 500
    },{
        title: "Shop Visits",
        post: 34,
        color: "gray",
        icon: <FaWalking />,
        colorWeight: 500
    },{
        title: "Saves from your shop",
        post: 55,
        color: "yellow",
        icon: <IoIosBookmarks />,
        colorWeight: 500
    },{
        title: "Shop Impression",
        post: 86,
        color: "red",
        icon: <BsStarHalf />,
        colorWeight: 500
    },{
        title: "Profile Viewed",
        post: 47,
        color: 'purple',
        icon: <FaEye />,
        colorWeight: 500
    },{
        title: "New Connects",
        post: 68,
        color: "blue",
        icon: <GrConnect />,
        colorWeight: 500
    },
];

export const UserData = [
    {
        id: 1,
        year: 2016,
        userGain: 80000,
        userLost: 823,
    },{
        id: 2,
        year: 2017,
        userGain:45677 ,
        userLost: 345,
    },{
        id: 3,
        year: 2018,
        userGain: 78888,
        userLost: 555,
    },{
        id: 4,
        year: 2019,
        userGain: 90000,
        userLost: 455,
    },{
        id: 1,
        year: 2020,
        userGain: 43000,
        userLost: 234,
    }
]

export const profileOpenTo = ['Buying', 'Selling', 'Quick Offer', 'Swapping', 'Bidding'];
export const tradingIn = ['Honda', 'Toyota', 'Benz']
export const backendLink = "http://localhost:4000";
export const frontend = "http://localhost:3000";
export const settingOption = [
    {
        id: 1,
        name: "General Settings",
        icon: <MdSettingsInputComponent />,
        link: "/setting/general"
    },{
        id: 2,
        name: "My Details",
        icon: <RiUserSettingsFill />,
        link: "/setting/details"
    },{
        id: 3,
        name: "Shop Information",
        icon: <AiFillShop />,
        link: "/setting/shopinfo"
    },{
        id: 4,
        name: "Notification",
        icon: <RiMailSettingsFill />,
        link: "/setting/notification"
    },{
        id: 5,
        name: "Account Settings",
        icon: <RiListSettingsLine />,
        link: "/setting/account"
    },{
        id: 6,
        name: "Security & Login",
        icon: <MdAdminPanelSettings />,
        link: "/setting/security"
    },{
        id: 7,
        name: "Logout",
        icon: <FaSignOutAlt />,
        link: "/logout"
    },{
        id: 8,
        name: "Deactivate Account",
        icon: <MdAirplanemodeInactive />,
        link: "/dashboard/deactivateAccount"
    },
]

export const notificationOptions = ['New Message', 'Comments', 'Likes', 'Offers', 'Requests', 'New Connect', 'New Posts', 'Reminders', 'Updates from Connects'];