import {nodeConfig} from "../nodeConfig/node.config";

const {env:{
    mongoUrl,
    secretKey,
    port,
    cloud_name,
    api_key,
    api_secret,
    user,
    pass,
    consumerkey,
    consumersecret,
    shortcode,
    passkey
}} = nodeConfig;


export {port,secretKey,mongoUrl,shortcode,consumerkey,consumersecret,passkey,cloud_name,api_key,api_secret,user,pass};