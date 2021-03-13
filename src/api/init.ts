// MIT License

// Copyright (c) 2018 Neutralinojs

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { ping } from '../ping/ping';
import { devClient } from '../debug/devclient';

export interface InitOptions extends BaseOption{
    pingSuccessCallback: Function;
    pingFailCallback: Function;
}

export function init(options: InitOptions) {
    let pingSuccessCallback = null;
    let pingFailCallback = null;

    if(options.onSuccess) {
        options.onSuccess();
    }
    if(options.pingSuccessCallback) {
        pingSuccessCallback = options.pingSuccessCallback;
    }
    if(options.pingFailCallback) {
        pingFailCallback = options.pingFailCallback;
    }
    if(window.NL_MODE && window.NL_MODE == 'browser')
        ping.start(pingSuccessCallback, pingFailCallback);

    if(typeof window.NL_ARGS != "undefined") {
        for(let i = 0; i < window.NL_ARGS.length; i++) {
            if(window.NL_ARGS[i] == '--debug-mode') {
                devClient.start();
                break;
            }
        }
    }
}
