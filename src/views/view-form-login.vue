<template>
    <div class="form-container">
        <div class="form-content flex-column">
            <h2>Entre com seus dados de acesso.</h2>
            <form @submit.prevent="submitLogin">
                <div class="input-user">
                    <label for="user">Nome de usuário ou e-mail:</label>
                    <input type="text" id="user" v-model="user" />
                </div>
                <div class="input-password">
                    <label for="password">Senha:</label>
                    <input type="password" id="password" v-model="password" />
                </div>
                <button type="submit">Entrar</button>
                <div class="message-error" v-show="showError">
                    <p>Usuário ou senha inválidos, tente novamente</p>
                </div>
                <a href="https://github.com/cherlau" target="_blank">Esqueci minha senha</a>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import useLocalStorage from '@/composable/useLocalStorage '

export default {
    name: 'ViewFormLogin',
    setup() {
        const { saveData, recebeDados } = useLocalStorage();

        saveData()

        const user = ref('')
        const password = ref('')
        const showError = ref(false)

        function submitLogin() {
            showError.value = recebeDados(user.value, password.value)
        }

        return { user, password, submitLogin, showError };
    },
};
</script>

<style scoped>
.form-container {
    width: 1020px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-content {
    display: flex;
    flex-direction: column;
    margin: 20px;
    width: 370px;
}

h2 {
    font-size: 18px;
    margin-bottom: 33px;
    font-weight: 900;
}

.form-content div {
    display: flex;
    flex-direction: column;
    font-weight: 600;
    font-size: 15px;
}

.form-content label {
    color: #5a7186;
    margin-bottom: 5px;
}

input {
    padding: 17px;
}


button {
    padding: 18px 0;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    background-color: #1AD18F;
    border-radius: 5px;
    margin: 18px 0 22px;
    width: 100%;

}

a {
    font-size: 14px;
    font-weight: 600;
    color: #3198ff;
}

.input-user {
    margin-bottom: 18px;
}

.message-error {
    background-color: #ecc8c5;
    border: 1px solid #b73f3b;
    border-radius: 5px;
    padding: 16px;
    margin-bottom: 12px;
}

.message-error p {
    color: #b73f3b;
}
</style>