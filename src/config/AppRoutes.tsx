import { lazy } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { Routes, Route } from 'react-router';


const ListMenu = lazy(() => import('../pages/ListMenu'));
const ListDetail = lazy(() => import('../pages/ListDetail'));
const CreateMenu = lazy(() => import('../pages/CreateMenu'));
// const UpdateMenu = lazy(() => import('../pages/UpdateMenu'));
// const DeleteMenu = lazy(() => import('../pages/DeleteMenu'));

export const AppRoutes = () => {
    // const { isLoading, userInfo } = useAppSelector(state => state.auth);

    // if(isLoading || !userInfo) {
    //     return <Routes>
    //         <Route path='/list-menu' element={<ListMenu />}/>
    //     </Routes>
    // }

    return <Routes>
        <Route path= '/list-menu' element={<ListMenu />} />
        <Route path= '/menu/:id' element={<ListDetail />} />
        {/* <Route path= '/create-menu' element={<CreateMenu />} /> */}
        {/* <Route path= '/update-menu/:id' element={<UpdateMenu />} />
        <Route path= '/delete-menu/:id' element={<DeleteMenu />} /> */}
        {/* {!userInfo && <Route path='/login' element={<LoginPage />} />} */}
    </Routes>
}