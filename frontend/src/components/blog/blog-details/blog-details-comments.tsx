import Image from 'next/image'
import React from 'react'

export default function BlogDetailsComments() {
  return (
    <ul>
        <li>
            <div className="tp-postbox-details-comment-box d-sm-flex align-items-start">
                <div className="tp-postbox-details-comment-thumb">
                    <Image src="/assets/images/users/user-2.jpg" alt="user" width={60} height={60}/>
                </div>
                <div className="tp-postbox-details-comment-content">
                    <div className="tp-postbox-details-comment-top d-flex justify-content-between align-items-start">
                    <div className="tp-postbox-details-comment-avater">
                        <h4 className="tp-postbox-details-comment-avater-title">Lance Bogrol</h4>
                        <span className="tp-postbox-details-avater-meta">12 April, 2023 at 3.50pm</span>
                    </div>
                    <div className="tp-postbox-details-comment-reply">
                        <a href="#">Reply</a>
                    </div>
                    </div>
                    <p>By defining and following internal and external processes, your team will have clarity on resources to <br/> attract and retain customers for your business.</p>
                </div>
            </div>
            <ul className="children">
                <li>
                    <div className="tp-postbox-details-comment-box d-sm-flex align-items-start">
                    <div className="tp-postbox-details-comment-thumb">
                        <Image src="/assets/images/users/user-3.jpg" alt="user" width={60} height={60}/>
                    </div>
                    <div className="tp-postbox-details-comment-content">
                        <div className="tp-postbox-details-comment-top d-flex justify-content-between align-items-start">
                            <div className="tp-postbox-details-comment-avater">
                                <h4 className="tp-postbox-details-comment-avater-title">Dasy Lily</h4>
                                <span className="tp-postbox-details-avater-meta">12 April, 2023 at 3.50pm</span>
                            </div>
                            <div className="tp-postbox-details-comment-reply">
                                <a href="#">Reply</a>
                            </div>
                        </div>
                        <p>By defining and following internal and external processes, your team will have clarity on resources to <br/> attract and retain customers for your business.</p>
                    </div>
                    </div>
                </li>
            </ul>
        </li>
        <li>
            <div className="tp-postbox-details-comment-box d-sm-flex align-items-start">
                <div className="tp-postbox-details-comment-thumb">
                    <Image src="/assets/images/users/user-4.jpg" alt="user" width={60} height={60}/>
                </div>
                <div className="tp-postbox-details-comment-content">
                    <div className="tp-postbox-details-comment-top d-flex justify-content-between align-items-start">
                    <div className="tp-postbox-details-comment-avater">
                        <h4 className="tp-postbox-details-comment-avater-title">Aurora Smith</h4>
                        <span className="tp-postbox-details-avater-meta">12 April, 2023 at 3.50pm</span>
                    </div>
                    <div className="tp-postbox-details-comment-reply">
                        <a href="#">Reply</a>
                    </div>
                    </div>
                    <p>By defining and following internal and external processes, your team will have clarity on resources to <br/> attract and retain customers for your business.</p>
                </div>
            </div>
        </li>
    </ul>
  )
}
