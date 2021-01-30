import { environment as env } from '../environments/environment';

export class AppSettings {
    public static API_ENDPOINT=`${env.dev.serverUrl}/api`;
    public static VALIDATOR_CODE=422;
}