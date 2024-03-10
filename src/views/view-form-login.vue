<template>
    <div class="form-container">
        <div class="form-content flex-column">
            <h2>Entre com seus dados de acesso.</h2>
            <form @submit.prevent="submitLogin">

                <ui-input 
                    label="Nome de usuário ou e-mail:"
                    label-color="#5a7186" 
                    input-height="51px" 
                    id="user"
                    :value="user"
                    v-model="user"
                    ></ui-input>
                    
                <ui-input 
                    type="password"
                    label="Senha:"
                    label-color="#5a7186" 
                    input-height="51px" 
                    id="password"
                    :value="password"
                    v-model="password"
                    ></ui-input>

                <ui-button
                    type="submit"
                    color="#fff"
                    design="md-16 sucess"
                    :loading="loading">Entrar</ui-button>

                <div class="message-error" v-show="showError">
                    <p>Usuário ou senha inválidos, tente novamente</p>
                </div>
                <a href="#">Esqueci minha senha</a>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import useLocalStorage from '@/composable/useLocalStorage '
import UiInput from '@/components/ui/ui-input'
import UiButton from '@/components/ui/ui-button'

export default {
    name: 'ViewFormLogin',
    components:{
        UiInput,
        UiButton
    },
    setup() {
        const { saveData, recebeDados } = useLocalStorage()

        saveData()

        const user = ref('')
        const password = ref('')
        const showError = ref(false)
        const loading = ref(false)

        function submitLogin() {
            loading.value = true

            setTimeout(() => {
                showError.value = recebeDados(user.value, password.value)
                loading.value = false
            }, "2000");
        }

        return { user, password, submitLogin, showError, loading }
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