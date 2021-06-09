import React from 'react'
import "./Sidebar.css"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Avatar, IconButton } from '@material-ui/core';
import {SearchOutlined} from '@material-ui/icons/';
import SidebarChat from '../sidebarChatComponent/SidebarChat';

function Sidebar() {
    return (
        <div className="sidebar">
            
            <div className="sidebar__header">
                <Avatar src="https://www.flaticon.com/svg/vstatic/svg/147/147144.svg?token=exp=1617626861~hmac=80e91fc6b52a5e0190bab1f79be5150a"/>
                <div className="sidebar__headerRight">
                    <IconButton>
                    <DonutLargeIcon/>
                    </IconButton>

                    <IconButton>
                    <ChatIcon/>
                    </IconButton>

                    <IconButton>
                    <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            
            <div className="sidebar__search">
                 <div className="sidebar__searchContainer">
                        <SearchOutlined/>
                        <input type="text" placeholder=" Search or start new
                        chat" />
                 </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
            </div>
        </div>
    )
}

export default Sidebar
