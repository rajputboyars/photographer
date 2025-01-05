"use client";

import React from "react";

const ContactUs = () => {
    return (
        <section className="py-8 bg-gray-900 text-white" id="contact">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-2">Get in Touch</h2>
                <div className="flex container flex-col lg:flex-row justify-between items-center lg:items-start gap-8">
                <p className="mb-6 flex-1 text-lg">
                    We'd love to hear from you! Reach out to us for any queries, feedback, or collaborations.
                </p>

                    {/* Social Media Links */}
                    <div className="flex-1 text-center">
                        {/* <h3 className="text-2xl font-semibold mb-4">Follow Us</h3> */}
                        <div className="flex justify-end items-center m-auto gap-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" text-white w-8 h-8"
                            >
                                <img src="/images/icons/facebook.png" alt="facebook" className="" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="  text-white w-8 h-8"
                            >
                                <img src="/images/icons/instagram.png" alt="instagram" className="" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="  text-white w-8 h-8"
                            >
                                <img src="/images/icons/logo.png" alt="whatsapp" className="" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="  text-white w-8 h-8"
                            >
                                <img src="/images/icons/gmail.png" alt="gmail" className="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
