
import Vue from 'vue';

class Dialog {
    constructor() { }

    static get supportTypes() {
        return ['object', 'html', 'componenttag', 'iframe'];
    }

    static show(options) {

        let { url, title, style, size, parent, component, data, close, callback, beforeClose, htmlText, template = '', type = 'object' } = options;

        if (!Dialog.supportTypes.includes(type)) throw new Error('The dialog component does not support type ' + type);

        if (type == 'object' && typeof component == 'object')
            template = `<div class="w680" v-if="show">
                            <el-dialog :style="style" :title="title" v-model="show" :size="size" :before-close="beforeClose" @close="close">
                                <child v-on:click="click" :data="data"></child>
                            </el-dialog>
                        </div>`;
        else if (type == 'html' && typeof component == 'string')
            template = `<div class="w680" v-if="show">
                            <el-dialog :title="title" v-model="show" :size="size" @close="close">${component}</el-dialog>
                        </div>`;
        else if (type == 'componenttag' && typeof component == 'string')
            template = `<div class="w680" v-if="show">
                            <el-dialog :title="title" v-model="show" :size="size" @close="close">
                                <${component} v-on:callback="callback" :init_data="data"></${component}>
                            </el-dialog>
                        </div>`;
        else if (type == 'iframe' && !!url)
            template = `<div class="w680 dialog-h400" v-if="show">
                            <el-dialog  :title="title" v-model="show" :size="size">
                                <iframe :src="url" style="width:100%;height:100%;"></iframe>
                            </el-dialog>
                        </div>`;
        else
            throw new Error('Component content definition error.');

        let dialog = new Vue({
            el: document.createElement('div'),
            data: () => ({
                url: url,
                title: title,
                style: style,
                size: size || 'small',
                modal: true,
                custom_class: 'dialg-class',
                close_on_press_escape: false,
                show_close: true,
                show: true,
                data: data,
            }),
            template: template,
            mounted: () => { },
            methods: {
                beforeClose(done) {
                    beforeClose && beforeClose();
                    done();
                },
                close() {
                    close && close();
                },
                click({ type, data }) {
                    if (!type || type == 'close' || type == 'cancel') {
                        this.show = false;
                    } else if (type == 'ok') {
                        callback && callback(data);
                    }
                },
            },
            components: {
                child: component,
            }
        });

        document.body.appendChild(dialog.$el);
    }
}

export default {
    install(Vue) {
        Vue.prototype.dialog = Dialog;
    }
};