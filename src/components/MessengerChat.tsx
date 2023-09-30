import { CustomChat, FacebookProvider } from 'react-facebook';
const Messenger = () => {
    return (
        <FacebookProvider appId="2015993698763127" chatSupport>
            <CustomChat pageId="150290534825169" minimized={true} />
        </FacebookProvider>  
    )
}
export default Messenger