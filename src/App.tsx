import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { DefaultLayout } from './layouts/defaultLayout/DefaultLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import OptionLanguages from './components/OptionLanguages/OptionLanguages';
import { RootState } from './redux/store';
function App() {
      const dataUser = useSelector((state: RootState) => state.user);
      return (
            <div className="App">
                  <Router>
                        {dataUser.isLoggedIn ? (
                              <React.Suspense fallback={<h2>Loading...</h2>}>
                                    <div className="wrapper wrapper-private">
                                          <Routes>
                                                {privateRoutes.map((route, index) => {
                                                      const Page = route.component;
                                                      let Layout = DefaultLayout;
                                                      if (route.layout) {
                                                            Layout = route.layout;
                                                      }
                                                      return (
                                                            <Route
                                                                  key={index}
                                                                  path={route.path}
                                                                  element={<Layout component={<Page />}></Layout>}
                                                            />
                                                      );
                                                })}
                                          </Routes>
                                    </div>
                              </React.Suspense>
                        ) : (
                              <div className="wrapper wrapper-public">
                                    <div style={{ width: '100%', position: 'relative' }}>
                                          <OptionLanguages
                                                style={{ position: 'absolute', right: '30px', top: '12px' }}
                                          />
                                    </div>
                                    <Routes>
                                          {publicRoutes.map((route, index) => {
                                                const Page = route.component;
                                                return <Route key={index} path={route.path} element={<Page />} />;
                                          })}
                                    </Routes>
                                    {/* <Route path="*" element={<Page404 />} /> */}
                              </div>
                        )}
                        <ToastContainer />
                  </Router>
            </div>
      );
}

export default App;