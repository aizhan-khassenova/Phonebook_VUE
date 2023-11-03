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
                this.localMessage = this.alertMessage; // Используйте локальную переменную
                this.localType = this.alertType; // Используйте локальную переменную
        
                // Удалите слово "Ошибка" из текста уведомления при ошибке
                this.localMessage = this.localType === 'danger' ? this.localMessage.replace('Ошибка: ', '') : this.localMessage;
                this.localMessage = this.localType === 'danger' ? this.localMessage.replace('Телефон', 'Контакт') : this.localMessage;

                wrapper.innerHTML = `
                    <div class="alert alert-${this.localType} alert-dismissible" role="alert">
                        <div><i class="bi ${icon}" id="i-check"></i>${this.localMessage}</div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
                alertPlaceholder.append(wrapper);
            }

            // Добавляем код для автоматического закрытия уведомления через 5 секунд
            setTimeout(() => {
                wrapper.remove(); // Удаляем уведомление из DOM через 5 секунд
            }, 1000);
        },
    },
};
</script>

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>
<style src="../styles/city.css"></style>

<style scoped>
/* alert */
#liveAlertPlaceholder {
	position: fixed;
	/* z-index: 1; */
	bottom: 0px;
	/* Устанавливаем отступ снизу */
	left: 15px;
	/* Устанавливаем отступ слева */
	text-align: left;
}
</style>