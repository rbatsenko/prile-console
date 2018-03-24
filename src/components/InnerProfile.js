import React from 'react';

export default class InnerProfile extends React.Component {
    
    render() {
        return (
            <div className="main-content">
                <div className="row gutters">
                    <div className="col-xl-6 col-lg-8 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-header">Form controls</div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="exOne">Email address</label>
                                    <input type="email" className="form-control" id="exOne" placeholder="name@example.com" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="selectTwo">Example select</label>
                                    <select className="form-control" id="selectTwo">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                                <div className="form-group m-0">
                                    <label htmlFor="exampleFormControlTextarea1">Textarea</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                                </div>
                                <div className="form-group m-0">
                                    <label htmlFor="exampleFormControlTextarea1">Textarea</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};