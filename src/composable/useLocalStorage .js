import { useTasks } from '@/store/tasks'

const useLocalStorage = () => {
  const store = useTasks();

  function saveData(){
    const defaultUser = {
      user: 'cherlau',
      email: 'cherlau@gmail.com',
      name: 'Cherlau da Silva Prado Filho',
      img: 'https://avatars.githubusercontent.com/u/112346259?v=4',
      position: 'Front-end Developer',
      password: '1234',
    };

    localStorage.setItem('user', JSON.stringify(defaultUser))
  }

  function recebeDados(user, password){

    const data = localStorage.getItem('user')
    const userData = JSON.parse(data)

    if((userData.user === user || userData.email === user) && userData.password === password){
        store.logged = true
        store.user = userData
        store.saveLoggedStateToLocalStorage()
        return false
    }else{
      return true
    }
  }

  return { saveData, recebeDados };
};

export default useLocalStorage;
