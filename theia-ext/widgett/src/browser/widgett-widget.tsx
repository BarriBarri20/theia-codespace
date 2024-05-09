import * as React from 'react';
import { injectable, postConstruct, inject } from '@theia/core/shared/inversify';
// import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';
import { Message } from '@theia/core/lib/browser';
import { JitsiMeeting } from '@jitsi/react-sdk';

@injectable()
export class WidgettWidget extends ReactWidget {

    static readonly ID = 'widgett:widget';
    static readonly LABEL = 'Widgett Widget';

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    @postConstruct()
    protected init(): void {
        this.doInit()
    }

    protected async doInit(): Promise<void> {
        this.id = WidgettWidget.ID;
        this.title.label = WidgettWidget.LABEL;
        this.title.caption = WidgettWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-window-maximize'; // example widget icon.
        this.update();
    }

    render(): React.ReactElement {

        // const header = `This is a sample wwwwidget which simply calls the messageService
        // in order to display an info message to end users.`;
        return <div id='widget-container'>
            {/* <AlertMessage type='INFO' header={header} /> */}
            <button id='displayMessageButton' className='theia-button secondary' title='Display Message' onClick={_a => this.displayMessage()}>Display Message</button>
            <JitsiMeeting
                roomName="PleaseUseAGoodRoomName"
                configOverwrite={{
                    startWithAudioMuted: true,
                    disableModeratorIndicator: true,
                    enableEmailInStats: false
                }}
                interfaceConfigOverwrite={{
                    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
                }}
                userInfo={{
                    email: 'hellp@ee.com',
                    displayName: 'YOUR_USERNAME'
                }}
                onApiReady={(externalApi) => {
                    // here you can attach custom event listeners to the Jitsi Meet External API
                    // you can also store it locally to execute commands
                }}
                getIFrameRef={(iframeRef) => {
                    iframeRef.style.height = '100vh';
                }}
            />
        </div>
    }

    protected displayMessage(): void {

        this.messageService.info('Congratulations: Widgett Widget Successfully Created!');
    }

    protected onActivateRequest(msg: Message): void {
        super.onActivateRequest(msg);
        const htmlElement = document.getElementById('displayMessageButton');
        if (htmlElement) {
            htmlElement.focus();
        }
    }

}
