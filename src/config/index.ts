import {nodeConfig} from "../nodeConfig/node.config";

const {env:{
    mongoUrl,
    secretKey,
    port,
    cloud_name,
    api_key,
    api_secret,
    user,
    pass
}} = nodeConfig;


export {port,secretKey,mongoUrl,cloud_name,api_key,api_secret,user,pass};