<template>
        <button
            :type="type"
            :disabled="disabled"
            :class="design"
            class="ui-button"
            @click="callback($event)"
        >
            <i v-if="leftIcon" :class="leftIcon"></i>

            <template v-if="!loading">
                <slot></slot>
            </template>

            <svg v-if="loading" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
        </button>
</template>

<script>

export default {
    name: 'ui-button',
    props: {
        type:{
            type: String,
            required: false,
            default: 'button'
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
			type: Boolean,
			required: false,
			default: false
		},
        leftIcon:{
            type: String,
            required: false,
            default: ''
        },
        design:{
            type: String,
            required: false,
            default: ''
        },
        background: {
            type: String,
            required: false,
            default: 'transparent'
        },
        color: {
            type: String,
            required: false,
            default: ''
        },
    },
    methods: {
		callback: function(e) {
            if(this.type === 'submit'){
                this.$emit('update:submit', e);
            }else{
                this.$emit('click-button', e);
            }
			
		}
	},
}

</script>


<style lang="stylus" scoped>

button{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    }

    i {
    font-size: 10px;
    padding-right: 7px;
}

.sidebar-categorie-item-content .highlighted{
    color: #2693ff ;
}

.highlighted i {
    color: #2693ff;
}

.btn-add-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 23px;
    right: 28px;
    border: none;
    color: #fff;
    font-size: 50px;
    width: 76px;
    height: 76px;
    border-radius: 50%;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
}


</style>