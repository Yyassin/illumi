import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Page from '../components/dash/Page'
import ServerHome from '../components/dash/ServerHome'
import Whiteboard from '../components/dash/Whiteboard'

const InnerRouter = (props) => (
    <Switch>
        <Route exact path="/home/" component={() =>
            <Page
                page={props.page}
                server={props.server}
                uid={props.uid}
                member={props.member}
                token={props.token}
                signout={props.endSession}
                addEvent={props.addEvent}
                deleteMessage={props.deleteMessage}
                editMember={props.editMember}
            />
        }></Route>
        <Route path="/home/serverhome/" component={() => 
            <ServerHome
                page={props.page}
                server={props.server}
                uid={props.uid}
                member={props.member}
                token={props.token}
                signout={props.endSession}
                addEvent={props.addEvent}
                editEvent={props.editEvent}
                deleteEvent={props.deleteEvent}
                deleteMessage={props.deleteMessage}
                editMember={props.editMember}/>
        }></Route>
        <Route path="/home/whiteboard/" component={() => 
            <Whiteboard
                page={props.page}
                server={props.server}
                uid={props.uid}
                member={props.member}
                token={props.token}
                signout={props.endSession}
                addEvent={props.addEvent}
                editEvent={props.editEvent}
                deleteEvent={props.deleteEvent}
                deleteMessage={props.deleteMessage}
                editMember={props.editMember}/>
        }></Route>
    </Switch>
)

export default InnerRouter;