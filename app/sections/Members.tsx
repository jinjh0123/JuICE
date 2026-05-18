import { Section } from "../components/Section"
import { HomeIcon } from '@heroicons/react/20/solid'
import React, { useRef, useEffect } from 'react'
import Logo from 'uilab-logo.js/lib/uilab-logo'

const members = [
    {
        name: "Jiho Jin",
        affiliation: "KAIST",
        // role: "PhD candidate",
        // thumb: require("../../public/images/members/jiho_jin.jpeg"),
        web: "https://jinjh0123.github.io/",
        // note: "*Research intern at NAVER AI Lab"
    },
    {
        name: "Junho Myung",
        affiliation: "KAIST",
        web: "https://junhomyung.github.io/"
    },
    {
        name: "Juhyun Oh",
        affiliation: "KAIST",
        web: "https://juhyunohh.github.io/"
    },
    {
        name: "Junyeong Park",
        affiliation: "KAIST",
        web: "https://jjjunyeong.github.io/"
    },
    {
        name: "Rifki Afina Putri",
        affiliation: "Universitas Gadjah Mada",
        web: "https://rifkiaputri.github.io/"
    },
    {
        name: "Sunipa Dev",
        affiliation: "Google",
        web: "https://sunipa.github.io/"
    },
    {
        name: "Vinodkumar Prabhakaran",
        affiliation: "Google"
    },
    {
        name: "Alice Oh",
        affiliation: "KAIST",
        // role: "Professor",
        // thumb: require("../../public/images/thumb.jpg"),
        web: "https://aliceoh9.github.io/"
    }
]

export const Members = () => {
    const logoRef = useRef(null);

    useEffect(() => {
        if (logoRef.current) {
            const logo = new Logo(logoRef.current, { defaultColor: '#222222' });

            return () => {
                logoRef.current = null;
            };
        }
    }, []);

    const styles = {
        logodrawingcontainer: {
            "float": "left"
        } as React.CSSProperties,
        logodrawing: {
            "width": 80,
            "height": 80,
            "color": "black"
        } as React.CSSProperties,
        logotext: {
            "display": "block",
            "float": "left",
            "padding": "0.5rem 0.5rem",
            "color": "black",
            "font-size": "1.8rem",
            "font-weight": "bold",
            "line-height": "1.2em"
        } as React.CSSProperties
      }

    return <Section title="Contributors">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {
            members.map(member => {
                return <div key={member.name} className="flex items-center">
                    {/* <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden">
                        <img className="fill" alt={`Thumbnail of ${member.name}`} src={member.thumb}/>
                    </div> */}
                    <div className="flex-1 ml-4">
                        <div className="text-xl font-semibold flex items-center">
                            <span>{member.name}</span>
                            {
                                member.web != null ? <a href={member.web} target="_blank"><HomeIcon className="w-5 h-5 text-gray-500 mb-0.5 ml-1"/></a> : null
                            }
                        </div>
                        
                        <div className="font-light">{member.role}</div>
                        <div className="font-light">{member.affiliation}</div>
                        {member.note != null ? <div className="font-light italic text-sm text-orange-500">{member.note}</div> : null }
                    </div>
                </div>
            })
        }
        </div>
        <div className="mt-8 flex items-center gap-6 gap-y-8 flex-wrap">
            <img className="w-[200px]" alt="KAIST logo" src={require("../../public/images/kaist_logo.png")} width={1728} height={552}/>
            <div className="uilab-logo">
                <div className="logo-drawing-container" style={styles.logodrawingcontainer}>
                    <div className="logo-drawing" ref={logoRef} style={styles.logodrawing}></div>
                </div>
                <div className="logo-text" style={styles.logotext}>USERS &amp;<br />INFORMATION</div>
            </div>
        </div>
    </Section>
}