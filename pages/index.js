import Head from 'next/head'
import React, { useEffect } from 'react'
import { Inter } from '@next/font/google'
import Landing from '@/comps/Landing/Landing'
import Service from '@/comps/Landing/Service'
import About from '@/comps/Landing/About'
import Testomonial from '@/comps/Landing/Testomonial'
import Footer from '@/comps/Landing/Footer'
import Contact from '@/comps/COntact/Contact'
import Projects from '@/comps/Landing/Projects'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  var [loading, setLoading] = React.useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      getAlerts()
    }, 1000)
  }, [])

  var [alert, setAlerts] = React.useState([])

  function getAlerts() {
    var showAlert = document.getElementById('showAlert')
    var clz = document.getElementById('clz')
    fetch('/api/admin/sendAlerts')
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          if (data.alerts.length > 0) {
            console.log(data.alerts[0])
            setAlerts(data.alerts[0])
            clz.click()
            showAlert.click()
          }
        }
      })

  }
  return (
    <>
      {/* You can open the modal using ID.showModal() method */}
      <button className="btn" id="showAlert" onClick={() => window.my_modal_4.showModal()}>open modal</button>
      <dialog id="my_modal_4" className="modal">
        <form method="dialog" className="modal-box  max-w-5xl">
          <h3 className="font-bold text-lg">{alert.title}</h3>
          <p className="py-4">{alert.description}</p>
          <img src={alert.image} alt={alert.title} className="conImg " />
          <div className="modal-action">
            {/* if there is a button, it will close the modal */}
            <button className="btn" id='clz'>Close</button>
          </div>
        </form>
      </dialog>
      <Head>
        <title>Advanceble Multimedia | Home</title>
        <meta name="description" content="Generated by Advanceble Multimedia | Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {(!loading) && <>
        <Landing />
        <Service />
        <Testomonial />
        <Contact />
        <Projects />
        <About />
        <Footer />
      </>}
      {(loading) &&
        <div className="Loading">
          <img src="https://i.ibb.co/pPFrPqq/ARTVERSE-2.gif" alt="Loading Animation" border="0" />
        </div>
      }

    </>
  )
}


