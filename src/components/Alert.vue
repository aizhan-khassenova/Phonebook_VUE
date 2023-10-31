<template>
    <div>
        <div id="liveAlertPlaceholder"></div>
    </div>
</template>

<!-- <script>
import '@/scripts/bootstrap.bundle.min.js';

export default {
    data() {
        return {
            localMessage: this.alertMessage,
            localType: this.alertType,
        };
    },

    props: {
        alertMessage: String,
        alertType: String,
    },

    methods: {
        showAlert() {
            const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
            const wrapper = document.createElement('div');

            if (this.alertMessage) {
                const icon = this.alertType === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill';

                // Удалите слово "Ошибка" из текста уведомления при ошибке
                this.alertMessage = this.alertType === 'danger' ? this.alertMessage.replace('Ошибка: ', '') : this.alertMessage;

                wrapper.innerHTML = `
                    <div class="alert alert-${this.alertType} alert-dismissible" role="alert">
                        <div><i class="bi ${icon}" id="i-check"></i>${this.alertMessage}</div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
                alertPlaceholder.append(wrapper);
            }
            // Добавляем код для автоматического закрытия уведомления через 5 секунд
            setTimeout(() => {
                wrapper.remove(); // Удаляем уведомление из DOM через 5 секунд
            }, 5000);
        },
    },
};
</script> -->

<style src="../styles/bootstrap.min.css"></style>
<style src="../styles/bootstrap-icons.css"></style>
<style src="../styles/city.css"></style>

<style scoped>
#table_container {
    padding: 50px 0;
}

#first_column_container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    /* border: 1px solid black; */

}

#sort_name_container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    /* border: 1px solid black; */
}

#sort_icon {
    margin-right: 30px;
    text-align: center;
    width: 30px;
    height: 30px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--primary-color);
    line-height: 30px;
}

#no-bullets-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

#second_column_container {
    height: 35px;
    display: flex;
    align-items: center;
    /* border: 1px solid black; */
}

#i-list {
    color: var(--primary-color);
    margin-right: 10px;
}
</style>