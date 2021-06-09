import { Avatar } from '@material-ui/core'
import { AvTimerSharp } from '@material-ui/icons'
import React from 'react'
import './SidebarChat.css'
function SidebarChat() {
    return (
        <div className="sidebarchat">
            <Avatar/>
            <div className="sidebarchat__info">
                <h2>Name</h2>
                <p>This is last message</p>
            </div>
        </div>
    )
}

export default SidebarChat
