<template>
    <div class="modal fade" id="modal-delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">{{ title }}</h1>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body" id="mb-delete">
                        <form @submit.prevent="deleteData">
                            <label id="l-delete">
                                <h1><i class="bi bi-exclamation-triangle-fill" id="i-danger"></i></h1>
                                <!-- Удаление этого города также приведет к удалению его данных. -->
                                {{ inputLabel }}
                            </label>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>

                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                            @click="deleteData">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios';
import '@/scripts/bootstrap.bundle.min.js';

export default {
    data() {
        return {
            data: null, // Инициализируем переменную для хранения данных
            newItem: '', // Добавьте новое поле для хранения названия нового города
            updatedItemId: null, // Добавляем поле для хранения идентификатора обновляемого города
            // alertMessage: null, // Добавьте переменную для хранения сообщения
        };
    },

    props: {
        title: String, // Определяем свойство title
        inputLabel: String, // Определяем свойство для текстовой метки поля ввода
        submitButtonText: String, // Определяем свойство для текста кнопки отправки
        apiEndpoint: String, // Добавьте это свойство
        name: String,
        inputplaceholder: String,
        itemId: String
    },

    methods: {

        deleteData() {
            // this.alertMessage = null; // Сброс сообщения перед выполнением запроса
            // Посылаем Delete-запрос на сервер для удаления города
            axios.delete('https://localhost:5001/api/' + this.apiEndpoint + '/' + this.itemId)
                .then(response => {
                    this.$emit('item-deleted'); // Отправляем событие с новым элементом (городом или улицей)
                    console.log(response.data);
                    // Обновляем данные на клиенте
                    // this.fetchData();
                    // Сбрасываем значения
                    // this.updatedCityId = null;
                    // this.newCityName = '';
                    // this.alertMessage = 'Город удален'; // Установите сообщение об успешном удалении
                    // this.showAlert(this.alertMessage, 'success'); // Отображение уведомления с типом 'success'
                })
                .catch(error => {
                    console.error('Ошибка при выполнении DELETE запроса:', error);
                });
        },
    },
};
</script>

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