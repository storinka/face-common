import {defineComponent, h} from "vue";

const Text = defineComponent({
    props: {
        tag: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: false,
        },
        className: {
            type: String,
            required: false,
        },
    },
    render() {
        const text = !this.text ? "" : this.text;

        return h(this.tag, {
            class: this.className,
        }, text.split("\n").reduce((prev: any, string: string): any => {
            if (!Array.isArray(prev)) {
                return [prev, h("br"), string];
            }

            return prev.concat([h("br"), string]);
        }));
    },
});

export default Text;
