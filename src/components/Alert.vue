<template>
    <div>
        <div id="liveAlertPlaceholder"></div>
    </div>
</template>

<script>
import '@/scripts/bootstrap.bundle.min.js';

export default {
    data() {
        return {
            localMessage: null,
            localType: null,
        };
    },

    props: {
        alertMessage: String,
        alertType: String,
    },

    watch: {
        alertMessage: 'showAlert',
    },

    methods: {
        showAlert() {
            const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
            const wrapper = document.createElement('div');
            this.$emit('alert');

            if (this.alertMessage) {
                const icon = this.alertType === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill';
                this.localMessage = this.alertMessage;
                this.localType = this.alertType;
                this.localMessage = this.localType === 'danger' ? this.localMessage.replace('Ошибка: ', '') : this.localMessage;
                this.localMessage = this.localType === 'danger' ? this.localMessage.replace('Телефон', 'Контакт') : this.localMessage;

                wrapper.innerHTML = `
                    <div class="alert alert-${this.localType} alert-dismissible" role="alert">
                        <div>
                            <i class="bi ${icon}" id="i-check"></i>

                            ${this.localMessage}
                        </div>
                        
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;

                alertPlaceholder.append(wrapper);
            }

            setTimeout(() => {
                wrapper.remove();
            }, 5000);
        },
    },
};
</script>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>

<style scoped>
#liveAlertPlaceholder {
    position: fixed;
    z-index: 1055;
    bottom: 0px;
    left: 15px;
    text-align: left;
}
</style>