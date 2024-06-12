export async function fetchRestEndpoint(route: string, method: 'GET' |'POST' |'PUT'
    |'DELETE', data?: object): Promise<any> {
    let options: any = { method };
    if (data) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(data);
    }
    const res = await fetch(route, options);
    if (!res.ok) {
        const error = new Error(`${method} ${res.url} ${res.status}
(${res.statusText})`);
        throw error;
    }
    if (res.status !== 204) {
        let responseData = await res.json();
        if (typeof responseData === 'string') {
            responseData = responseData
                .replace(/Car\w*/g, '🚗')
                .replace(/Obstacle\w*/g, '🚧')
                    .replace(/Input\w*/g, '🕹️');
        }
        return responseData;
    }
}