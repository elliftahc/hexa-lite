
import { useEthersProvider } from "../context/Web3Context"
import { connect } from "../servcies/magic"
import { IonButton, useIonAlert } from "@ionic/react"

const ConnectButton = (props: {
  style?: any;
  size?: "small" | "default" | "large";
  expand?: "full" | "block";
}) => {
  const [present, dismiss] = useIonAlert();
  // Get the initializeWeb3 function from the Web3 context
  const { initializeWeb3 } = useEthersProvider()
  // Define the event handler for the button click
  const handleConnect = async () => {
    // present({ 
    //   inputs: [{ name: 'email', type: 'email', placeholder: 'Email' }],
    //   buttons: [
    //     { text: 'Cancel', handler: (d) => dismiss() },
    //     { text: 'Ok', role: 'ok' },
    //   ],
    //   onDidDismiss: async (event) =>{
    //     console.log('did dismiss', event);
    //     const { detail: {data, role} } = event;
    //     if (role !== 'ok') {
    //       return;
    //     }
    //     const { email } = data.values;
    //     console.log('email', email);
    //     const address = await connect();
    //     console.log('address', address);
    //     await initializeWeb3();
    //   },
    // });

    try {
      await connect();
      // If connection to the wallet was successful, initialize new Web3 instance
      await initializeWeb3()
    } catch (error) {
      // Log any errors that occur during the connection process
      console.error("handleConnect:", error)
    }
  }

  // Render the button component with the click event handler
  return <IonButton 
    size={props?.size||'default'} 
    style={props.style||{}} 
    expand={props?.expand||undefined}
    onClick={handleConnect}>Connect</IonButton>
}

export default ConnectButton