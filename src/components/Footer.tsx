import { memo } from 'react';
import { LuGithub, LuInstagram, LuLinkedin, LuMail, LuTwitter } from 'react-icons/lu';
const Footer = () => {
    return (<>
        <footer className="my-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-text-muted ">
            <div>
                &copy; {new Date().getFullYear()} Devraj Chatribin. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
                <a href="#" className="hover:text-text-primary transition-colors" aria-label="LinkedIn">
                    <LuLinkedin className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-text-primary transition-colors" aria-label="GitHub">
                    <LuGithub className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-text-primary transition-colors" aria-label="Instagram">
                    <LuInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-text-primary transition-colors" aria-label="Email">
                    <LuMail className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-text-primary transition-colors" aria-label="Twitter">
                    <LuTwitter className="w-5 h-5" />
                </a>
            </div>
        </footer>
    </>)
}


export default memo(Footer)