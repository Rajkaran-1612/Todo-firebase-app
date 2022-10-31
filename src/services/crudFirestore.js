import { db } from "../firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const userCollectionRef = collection(db, "users");
const todoCollectionRef = collection(db, "todos");

class userDataService {
    addUser = (newUser) => {
        return addDoc(userCollectionRef, newUser);
    };

    updateUser = (id, updatedUser) => {
        const userDoc = doc(db, "users", id);
        return updateDoc(userDoc, updatedUser);
    };

    deleteUser = (id) => {
        const userDoc = doc(db, "users", id);
        return deleteDoc(userDoc);
    };

    getAllUsers = () => {
        return getDocs(userCollectionRef);
    };

    getUser = (id) => {
        const userDoc = doc(db, "users", id);
        return getDoc(userDoc);
    };
}

class todoDataService {
    addTodo = (newTodo) => {
        return addDoc(todoCollectionRef, newTodo);
    };

    updateTodo = (id, updatedTodo) => {
        const todoDoc = doc(db, "todos", id);
        return updateDoc(todoDoc, updatedTodo);
    };

    deleteTodo = (id) => {
        const todoDoc = doc(db, "todos", id);
        return deleteDoc(todoDoc);
    };

    getAllTodos = () => {
        return getDocs(todoCollectionRef);
    };

    getTodo = (id) => {
        const todoDoc = doc(db, "todos", id);
        return getDoc(todoDoc);
    };
} 

todoDataService = new todoDataService();
export { todoDataService };
export default new userDataService();
