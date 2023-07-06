import {
  IonAvatar,
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonListHeader,
  IonPopover,
  useIonToast,
} from "@ionic/react";
import { useEthersProvider } from "../context/Web3Context";
import { getMagic } from "../servcies/magic";
import { useWallet } from "@lifi/widget";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../context/UserContext";
import { copyOutline, closeSharp } from "ionicons/icons";
import { getAvatarFromEVMAddress } from "../servcies/avatar";

const splitAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

function DisconnectPopover({
  handleDisconnect,
  user,
  popoverRef,
}: {
  handleDisconnect: () => void;
  user: string;
  popoverRef: React.RefObject<HTMLIonPopoverElement>;
}) {

  const [present, dismiss] = useIonToast();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getAvatar = async () => {
      const url = await getAvatarFromEVMAddress(user);
      setAvatarUrl(url);
    };
    getAvatar();
  }, [user]);

  const handleActions = async (type: string, payload: string) => {
    if (type === "copy") {
      navigator?.clipboard?.writeText(payload);
    }
    // display toast confirmation
    await present({
      message: `Copy to clipboard`,
      duration: 5000,
      color: "success",
    });
  }

  return (
    <>
      <IonPopover
        ref={popoverRef}
        trigger="click-trigger-disconnect"
        triggerAction="click"
        style={{ '--min-width': "320px" }}
      >
        <IonContent class="ion-no-padding">
          <IonListHeader>
            <IonLabel>Wallet Address</IonLabel>
          </IonListHeader>
          <IonItem className="ion-margin-vertical" lines="none">
            <IonAvatar slot="start">
              <img src={avatarUrl} />
            </IonAvatar>
            <IonLabel>{splitAddress(user)}</IonLabel>
            <IonIcon 
              size="small" 
              onClick={() => handleActions('copy', user)} 
              slot="end" 
              icon={copyOutline}
              style={{cursor: 'pointer'}} />
          </IonItem>
          <div className="ion-padding">
            <IonButton
              style={{cursor: 'pointer'}}
              expand="block"
              onClick={(e) => {
                // disable button
                e.currentTarget.disabled = true;
                // disconnect wallet
                handleDisconnect();
              }}
            >
              Disconnect
            </IonButton>
          </div>
        </IonContent>
      </IonPopover>
    </>
  );
}

const DisconnectButton = (props: {
  style?: any;
  size?: "small" | "default" | "large";
  expand?: "full" | "block";
}) => {
  const { user } = useUser();
  const popoverRef = useRef<HTMLIonPopoverElement>(null);
  // Get the initializeWeb3 function from the Web3 context
  const { initializeWeb3 } = useEthersProvider();

  // Define the event handler for the button click
  const handleDisconnect = async () => {
    try {
      // Try to disconnect the user's wallet using Magic's logout method
      const magic = await getMagic();
      await magic.user.logout();
      // After successful disconnection, re-initialize the Web3 instance
      initializeWeb3();
    } catch (error) {
      // Log any errors that occur during the disconnection process
      console.log("handleDisconnect:", error);
    }
  };

  // Render the button component with the click event handler
  return (
    <>
      <IonButton
        id="click-trigger-disconnect"
        size={props?.size || "default"}
        style={props.style || {}}
        expand={props?.expand || undefined}
      >
        {splitAddress(`${user}`)}
      </IonButton>
      <DisconnectPopover
        handleDisconnect={handleDisconnect}
        user={`${user}`}
        popoverRef={popoverRef}
      />
    </>
  );
};

export default DisconnectButton;
