import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  LayoutDashboard, Users, GraduationCap, CalendarDays, ClipboardCheck, QrCode,
  Video, BookOpen, BrainCircuit, FileText, ClipboardList, BriefcaseBusiness,
  FolderKanban, Library, FlaskConical, Bus, Utensils, Wallet, Shield, MessageSquare,
  CalendarCheck, Bell, Settings, Search, Menu, ChevronDown, ChevronRight, LogOut,
  Plus, Download, Filter, MoreHorizontal, Clock, CheckCircle2, AlertCircle,
  TrendingUp, TrendingDown, ArrowUpRight, Play, Eye, Upload, Sparkles, MapPin,
  CreditCard, UserRound, Building2, GraduationCap as Grad, X, Check, CircleHelp,
  FileCheck, Clipboard, Video as VideoIcon, UsersRound, ScanFace, Fingerprint,
  RefreshCw, Send, Star, BookMarked, Briefcase, Award, MessageCircle, CarFront,
  Home, DoorOpen, HeartPulse, SearchCheck
} from 'lucide-react';
import './styles.css';

const navGroups = [
  { title:'OVERVIEW', items:[['Dashboard',LayoutDashboard],['Notifications',Bell]] },
  { title:'ACADEMICS', items:[['Students',Users],['Faculty',GraduationCap],['Timetable',CalendarDays],['Attendance',ClipboardCheck],['Exams & Results',FileText],['Assignments',ClipboardList],['Learning Hub',BookOpen],['Recorded Classes',Video],['AI Learning',BrainCircuit]] },
  { title:'STUDENT LIFE', items:[['Project Hub',FolderKanban],['Placement & Career',BriefcaseBusiness],['Library',Library],['Lab Management',FlaskConical],['Hostel',Home],['Transport',Bus],['Canteen',Utensils],['Events & Clubs',CalendarCheck]] },
  { title:'CAMPUS OPERATIONS', items:[['Fees & Finance',Wallet],['Safety & Security',Shield],['Grievances',MessageSquare],['Parent Portal',UsersRound],['Reports & Analytics',TrendingUp],['Settings',Settings]] }
];

const descriptions = {
  'Students':'Manage student profiles, admissions, enrollment, documents and academic history.',
  'Faculty':'Faculty directory, workload, subject allocation, leave and mentoring.',
  'Timetable':'Manage class schedules, rooms, faculty allocation and timetable conflicts.',
  'Attendance':'Run QR, face, biometric or manual attendance sessions and review exceptions.',
  'Exams & Results':'Exam schedules, hall tickets, marks entry, approval and published results.',
  'Assignments':'Create assignments, set deadlines, review submissions and provide feedback.',
  'Learning Hub':'Study materials, quizzes, notes, learning activities and progress.',
  'Recorded Classes':'Approved classroom recordings, subject library, playback and learning progress.',
  'AI Learning':'Lecture summaries, transcripts, topic search, flashcards and study assistance.',
  'Project Hub':'Project ideas, teams, guide allocation, milestones and reviews.',
  'Placement & Career':'Company drives, eligibility, applications, skill preparation and offers.',
  'Library':'Catalog, issue/return, reservations, due dates and digital resources.',
  'Lab Management':'Lab schedules, equipment inventory, bookings and maintenance.',
  'Hostel':'Room allocation, resident records, visitor logs, mess and complaints.',
  'Transport':'Routes, stops, vehicle records, student passes and tracking status.',
  'Canteen':'Menu, pre-orders, order queue, payments and kitchen operations.',
  'Events & Clubs':'Campus events, club activities, registrations and participation.',
  'Fees & Finance':'Fee structures, payment records, receipts, scholarships and dues.',
  'Safety & Security':'Visitor access, incident reports, emergency alerts and authorized CCTV access.',
  'Grievances':'Student complaints, assignment, escalation, status and resolution.',
  'Parent Portal':'Linked student attendance, results, fees, timetable and communication.',
  'Reports & Analytics':'Institution-wide academic, attendance, placement and operational insights.',
  'Notifications':'Campus announcements, alerts, reminders and delivery status.',
  'Settings':'Institution profile, role permissions, security and module configuration.'
};

const seedStudents = [
  {id:'SC360-2401',name:'Ananya Kumar',dept:'Computer Science',year:'III Year',attendance:'94%',status:'Active'},
  {id:'SC360-2402',name:'Arjun Prakash',dept:'Artificial Intelligence',year:'II Year',attendance:'87%',status:'Active'},
  {id:'SC360-2403',name:'Meera S',dept:'Electronics',year:'III Year',attendance:'76%',status:'Review'},
  {id:'SC360-2404',name:'Rahul Dev',dept:'Mechanical',year:'IV Year',attendance:'91%',status:'Active'},
  {id:'SC360-2405',name:'Nivetha R',dept:'Computer Science',year:'I Year',attendance:'82%',status:'Active'}
];
const initialTasks = [
  {title:'Data Structures – Linked Lists',meta:'CSE · Due tomorrow, 5:00 PM',state:'In progress'},
  {title:'Database Management – ER Diagram',meta:'IT · Due 26 Nov, 11:59 PM',state:'Not started'},
  {title:'Machine Learning – Mini Project',meta:'AIML · Due 29 Nov, 4:00 PM',state:'Submitted'}
];
const roles = ['Student','Faculty','College Admin','HOD','Principal','Parent'];

function App(){
  const [role,setRole] = useState('College Admin');
  const [page,setPage] = useState('Dashboard');
  const [sidebarOpen,setSidebarOpen] = useState(true);
  const [query,setQuery] = useState('');
  const [showProfile,setShowProfile] = useState(false);
  const [showAdd,setShowAdd] = useState(false);
  const [modalTitle,setModalTitle] = useState('');
  const [toast,setToast] = useState('');
  const [students,setStudents] = useState(seedStudents);
  const [tasks,setTasks] = useState(initialTasks);
  const [attendanceMethod,setAttendanceMethod] = useState('Dynamic QR');
  const [sessionActive,setSessionActive] = useState(false);
  const [classFilter,setClassFilter] = useState('All classes');
  const [selectedVideo,setSelectedVideo] = useState('Introduction to Machine Learning');
  const [searchTerm,setSearchTerm] = useState('');

  const allItems = navGroups.flatMap(g=>g.items.map(i=>i[0]));
  const filteredGroups = navGroups.map(g=>({...g,items:g.items.filter(i=>i[0].toLowerCase().includes(query.toLowerCase()))})).filter(g=>g.items.length);
  const visibleStudents = students.filter(s=>(s.name+s.id+s.dept).toLowerCase().includes(searchTerm.toLowerCase()));

  function notify(msg){setToast(msg);setTimeout(()=>setToast(''),3000);}
  function openAdd(title){setModalTitle(title);setShowAdd(true);}
  function choosePage(p){setPage(p);setQuery('');setSidebarOpen(window.innerWidth>850);}
  function addStudent(e){
    e.preventDefault();
    const f=new FormData(e.currentTarget);
    const name=f.get('name')?.toString().trim();
    if(!name)return;
    setStudents(prev=>[{id:'SC360-'+(2406+prev.length),name,dept:f.get('dept'),year:f.get('year'),attendance:'100%',status:'Active'},...prev]);
    setShowAdd(false);notify('Student profile added to this demo workspace.');
  }

  return <div className="app">
    <aside className={`sidebar ${sidebarOpen?'':'collapsed'}`}>
      <div className="brand-row">
        <div className="brand-symbol"><i/><i/><i/><i/></div>
        {sidebarOpen&&<div className="brand-name"><b>SMART CAMPUS <em>360</em></b><small>CAMPUS MANAGEMENT PLATFORM</small></div>}
        <button className="icon-btn sidebar-toggle" onClick={()=>setSidebarOpen(!sidebarOpen)}><Menu size={18}/></button>
      </div>
      <div className="institution">
        <div className="institution-logo"><Building2 size={18}/></div>
        {sidebarOpen&&<div><b>Northstar Institute</b><small>Autonomous · 2026–27</small></div>}
        {sidebarOpen&&<ChevronDown size={15} className="muted-icon"/>}
      </div>
      <div className="nav-scroll">
        {filteredGroups.map(group=><div className="nav-group" key={group.title}>
          {sidebarOpen&&<div className="nav-heading">{group.title}</div>}
          {group.items.map(([label,Icon])=><button key={label} title={!sidebarOpen?label:''} className={`nav-item ${page===label?'active':''}`} onClick={()=>choosePage(label)}>
            <Icon size={18}/>{sidebarOpen&&<><span>{label}</span>{label==='Notifications'&&<i className="nav-count">4</i>}</>}
          </button>)}
        </div>)}
      </div>
      <div className="sidebar-bottom">
        <div className="help-card"><div className="help-icon"><CircleHelp size={17}/></div>{sidebarOpen&&<div><b>Need help?</b><small>Visit the support center</small></div>}{sidebarOpen&&<ChevronRight size={15}/>}</div>
        <button className="profile-mini" onClick={()=>setShowProfile(!showProfile)}>
          <div className="avatar">KA</div>{sidebarOpen&&<><div className="profile-copy"><b>Kavya Admin</b><small>{role}</small></div><MoreHorizontal size={17}/></>}
        </button>
      </div>
    </aside>

    <main className="main-area">
      <header className="topbar">
        <div className="crumb"><span>Workspace</span><ChevronRight size={14}/><b>{page}</b></div>
        <div className="top-actions">
          <div className="global-search"><Search size={16}/><input placeholder="Search anything..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){choosePage('Students');notify('Showing student directory results.')}}}/><kbd>⌘ K</kbd></div>
          <button className="top-icon" onClick={()=>choosePage('Notifications')}><Bell size={18}/><i/></button>
          <div className="top-divider"/>
          <button className="role-switch" onClick={()=>setShowProfile(!showProfile)}><div className="avatar small">KA</div><span>{role}</span><ChevronDown size={14}/></button>
          {showProfile&&<div className="profile-pop"><b>Switch workspace role</b>{roles.map(r=><button key={r} onClick={()=>{setRole(r);setShowProfile(false);notify(`Previewing ${r} workspace`);}}>{r}{r===role&&<Check size={14}/>}</button>)}<hr/><button onClick={()=>notify('Sign-out is a demo action. Connect authentication to enable it.')}><LogOut size={14}/> Sign out</button></div>}
        </div>
      </header>

      <div className="content">
        {page==='Dashboard'?<Dashboard role={role} choosePage={choosePage} notify={notify}/>:page==='Attendance'?<Attendance method={attendanceMethod} setMethod={setAttendanceMethod} active={sessionActive} setActive={setSessionActive} notify={notify}/>:page==='Recorded Classes'?<RecordedClasses selected={selectedVideo} setSelected={setSelectedVideo} notify={notify}/>:page==='Students'?<Students students={visibleStudents} searchTerm={searchTerm} setSearchTerm={setSearchTerm} openAdd={()=>openAdd('Add student')}/>:page==='Timetable'?<Timetable notify={notify}/>:page==='Learning Hub'||page==='Assignments'||page==='Exams & Results'?<Learning page={page} tasks={tasks} setTasks={setTasks} notify={notify}/>:page==='Notifications'?<Notifications notify={notify}/>:<GenericPage page={page} notify={notify} openAdd={openAdd}/>}
      </div>
      <footer className="app-footer"><span>© 2026 SMART CAMPUS 360</span><span>Secure campus workspace <i/> All systems operational</span><span>Version 1.0.0 · Demo</span></footer>
    </main>

    {showAdd&&<div className="overlay" onMouseDown={()=>setShowAdd(false)}><div className="modal" onMouseDown={e=>e.stopPropagation()}>
      <button className="modal-x" onClick={()=>setShowAdd(false)}><X size={18}/></button>
      <div className="modal-kicker">CAMPUS DIRECTORY</div><h2>{modalTitle}</h2><p>Add a new profile to the local demo data.</p>
      <form onSubmit={addStudent}>
        <label>Full name<input name="name" placeholder="Enter full name" required/></label>
        <label>Department<select name="dept"><option>Computer Science</option><option>Artificial Intelligence</option><option>Electronics</option><option>Mechanical</option><option>Commerce</option></select></label>
        <label>Year<select name="year"><option>I Year</option><option>II Year</option><option>III Year</option><option>IV Year</option></select></label>
        <button className="primary-btn full" type="submit">Add student <Plus size={16}/></button>
      </form>
    </div></div>}
    {toast&&<div className="toast"><CheckCircle2 size={17}/>{toast}</div>}
  </div>
}

function PageHeader({eyebrow,title,subtitle,action,actionLabel='Add new',onAction}){
 return <div className="page-header"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{action&&<button className="primary-btn" onClick={onAction}><Plus size={16}/>{actionLabel}</button>}</div>
}
function Stat({label,value,change,icon:Icon,tone='purple',down=false}){return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={19}/></div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className={`stat-change ${down?'negative':''}`}>{down?<TrendingDown size={13}/>:<TrendingUp size={13}/>} {change}</div></div>}
function Dashboard({role,choosePage,notify}){
 const cards=role==='Student'?[['Attendance','92%','+3.2% this month',ClipboardCheck,'purple'],['Courses','06','2 classes today',BookOpen,'cyan'],['Assignments','04','2 due this week',ClipboardList,'orange'],['Learning hours','28.5h','+12% this month',Clock,'green']]:[['Total students','2,846','+8.4% this semester',Users,'purple'],['Faculty members','184','+3 new this month',GraduationCap,'cyan'],['Attendance today','91.8%','+2.1% from yesterday',ClipboardCheck,'green'],['Pending requests','27','Needs review',FileText,'orange']];
 return <><PageHeader eyebrow={`GOOD AFTERNOON · ${role.toUpperCase()}`} title="Campus overview" subtitle="Here’s what’s happening across your campus today." action actionLabel="Quick action" onAction={()=>notify('Choose a module from the navigation to create a record.')}/>
  <div className="stat-grid">{cards.map(([l,v,c,I,t])=><Stat key={l} label={l} value={v} change={c} icon={I} tone={t}/>)}</div>
  <div className="dashboard-grid">
   <section className="panel wide"><div className="panel-head"><div><h3>Campus activity</h3><p>Attendance overview · This week</p></div><button className="select-small">This week <ChevronDown size={13}/></button></div><div className="chart-legend"><span><i className="legend-purple"/>Present</span><span><i className="legend-cyan"/>Absent</span></div><div className="bar-chart">{[['Mon',78,12],['Tue',88,9],['Wed',82,11],['Thu',94,5],['Fri',91,7],['Sat',62,18],['Sun',20,4]].map(([d,p,a])=><div className="bar-group" key={d}><div className="bars"><i style={{height:p+'%'}}/><i style={{height:a+'%'}}/></div><small>{d}</small></div>)}</div></section>
   <section className="panel"><div className="panel-head"><div><h3>Today’s schedule</h3><p>Monday, 23 November</p></div><button className="more-btn" onClick={()=>choosePage('Timetable')}><ArrowUpRight size={17}/></button></div><div className="schedule-list"><div className="schedule-item"><time>09:00</time><i className="timeline purple-line"/><div><b>Data Structures</b><small>Room A-204 · Prof. Priya</small></div><span className="live-pill">LIVE</span></div><div className="schedule-item"><time>10:30</time><i className="timeline cyan-line"/><div><b>Machine Learning</b><small>AI Lab 02 · Dr. Kumar</small></div></div><div className="schedule-item"><time>13:30</time><i className="timeline orange-line"/><div><b>Database Systems</b><small>Room B-106 · Prof. Arun</small></div></div></div></section>
   <section className="panel"><div className="panel-head"><div><h3>Quick access</h3><p>Frequently used modules</p></div></div><div className="quick-grid">{[['Attendance',ClipboardCheck,'purple'],['Recorded Classes',Video,'cyan'],['Timetable',CalendarDays,'orange'],['Placement & Career',BriefcaseBusiness,'green']].map(([n,I,t])=><button className="quick-item" key={n} onClick={()=>choosePage(n)}><span className={`quick-icon ${t}`}><I size={18}/></span><b>{n}</b><ArrowUpRight size={14}/></button>)}</div></section>
   <section className="panel"><div className="panel-head"><div><h3>Needs attention</h3><p>Items that may need your review</p></div><span className="count-badge">03</span></div><div className="attention-list"><button onClick={()=>choosePage('Attendance')}><span className="attention-dot orange-dot"/><span><b>Attendance below 75%</b><small>18 students need review</small></span><ChevronRight size={15}/></button><button onClick={()=>choosePage('Grievances')}><span className="attention-dot red-dot"/><span><b>Open grievances</b><small>7 awaiting response</small></span><ChevronRight size={15}/></button><button onClick={()=>choosePage('Recorded Classes')}><span className="attention-dot cyan-dot"/><span><b>Recording review</b><small>4 videos pending approval</small></span><ChevronRight size={15}/></button></div></section>
  </div>
 </>;
}
function Attendance({method,setMethod,active,setActive,notify}){
 const [tab,setTab]=useState('Session');const [checked,setChecked]=useState([true,true,false,true,false]);
 const names=['Ananya Kumar','Arjun Prakash','Meera S','Rahul Dev','Nivetha R'];
 return <><PageHeader eyebrow="ACADEMICS / ATTENDANCE" title="Smart attendance" subtitle="Create a class session, verify student presence and finalize attendance." actionLabel={active?'End session':'Start attendance'} action onAction={()=>{setActive(!active);notify(active?'Attendance session ended. Review and finalize the register.':'Attendance session started in demo mode.')}}/>
  <div className="attendance-banner"><div className="banner-symbol"><ClipboardCheck size={23}/></div><div><b>{active?'Attendance session is live':'Ready to take attendance'}</b><p>{active?'CSE · III Year · Data Structures · Room A-204':'Select a class and verification method to begin a session.'}</p></div><span className={`session-status ${active?'is-live':''}`}><i/>{active?'LIVE SESSION':'NOT STARTED'}</span></div>
  <div className="tabs">{['Session','Live register','History'].map(t=><button className={tab===t?'selected':''} onClick={()=>setTab(t)} key={t}>{t}</button>)}</div>
  {tab==='Session'?<div className="attendance-layout"><section className="panel"><div className="panel-head"><div><h3>Session configuration</h3><p>Choose class and attendance method</p></div></div><div className="form-grid"><label>Department<select><option>Computer Science</option><option>Artificial Intelligence</option><option>Electronics</option></select></label><label>Class / Section<select><option>III Year · Section A</option><option>III Year · Section B</option></select></label><label>Subject<select><option>Data Structures</option><option>Database Systems</option><option>Machine Learning</option></select></label><label>Classroom<select><option>Room A-204</option><option>AI Lab 02</option></select></label></div><div className="subhead">VERIFICATION METHOD</div><div className="method-grid">{[['Dynamic QR',QrCode,'Short-lived rotating QR'],['Face verification',ScanFace,'Consent-based matching'],['Biometric',Fingerprint,'Supported device check-in'],['Manual register',Clipboard,'Faculty marks roster']].map(([n,I,d])=><button key={n} className={`method-card ${method===n?'chosen':''}`} onClick={()=>setMethod(n)}><I size={20}/><b>{n}</b><small>{d}</small>{method===n&&<CheckCircle2 size={15} className="method-check"/>}</button>)}</div><div className="notice"><Shield size={16}/><span>Use only institution-approved verification. Face and biometric methods require consent, secure enrollment and an accessible alternative.</span></div></section>
  <section className="panel session-side"><div className="panel-head"><div><h3>Session preview</h3><p>Data Structures · III A</p></div></div><div className="qr-preview"><div className="qr-art"><QrCode size={86}/><span>DEMO QR</span></div><b>{active?'QR session active':'QR will appear here'}</b><small>{active?'Refresh token · 00:42 remaining':'Start attendance to generate a session token'}</small></div><div className="mini-stats"><div><b>42</b><small>Enrolled</small></div><div><b>{active?'28':'—'}</b><small>Present</small></div><div><b>{active?'14':'—'}</b><small>Pending</small></div></div><button className="primary-btn full" onClick={()=>{setActive(!active);notify(active?'Session stopped.':'Demo attendance session started.');}}>{active?'End session':'Start attendance session'} <ArrowUpRight size={16}/></button></section></div>:tab==='Live register'?<section className="panel table-panel"><div className="panel-head"><div><h3>Live attendance register</h3><p>Demo roster · {checked.filter(Boolean).length} of 5 marked present</p></div><button className="outline-btn" onClick={()=>notify('Register exported in demo mode.')}><Download size={15}/> Export</button></div><div className="table-wrap"><table><thead><tr><th>STUDENT</th><th>STUDENT ID</th><th>VERIFICATION</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{names.map((n,i)=><tr key={n}><td><b>{n}</b></td><td>SC360-240{i+1}</td><td>{i===0?'Dynamic QR':i===1?'Face review':'Manual'}</td><td><span className={`status-pill ${checked[i]?'green-pill':'orange-pill'}`}>{checked[i]?'Present':'Pending'}</span></td><td><button className="tiny-action" onClick={()=>setChecked(v=>v.map((x,j)=>j===i?!x:x))}>{checked[i]?'Mark pending':'Mark present'}</button></td></tr>)}</tbody></table></div></section>:<section className="panel empty-history"><Clock size={28}/><h3>Attendance history</h3><p>Past sessions and finalized registers will appear here.</p><button className="outline-btn" onClick={()=>notify('No previous demo sessions found.')}>Refresh history <RefreshCw size={14}/></button></section>}
 </>;
}
function RecordedClasses({selected,setSelected,notify}){
 const videos=[['Introduction to Machine Learning','Dr. Kumar','AIML · 23 Nov 2026','48:20','92%'],['Database Normalization','Prof. Arun','CSE · 21 Nov 2026','52:14','100%'],['Data Structures: Trees','Prof. Priya','CSE · 20 Nov 2026','44:08','35%'],['Computer Networks – TCP/IP','Dr. Meena','IT · 18 Nov 2026','56:32','0%']];
 return <><PageHeader eyebrow="LEARNING / SMART CLASSROOM" title="Recorded classes" subtitle="Explore approved classroom recordings, revisit concepts and continue where you left off."/><div className="recording-summary"><div><Video size={21}/><span><b>126</b><small>Published recordings</small></span></div><div><Clock size={21}/><span><b>08h 42m</b><small>Learning time this week</small></span></div><div><BookOpen size={21}/><span><b>12</b><small>Subjects available</small></span></div></div><div className="recording-layout"><section className="panel video-player"><div className="video-stage"><div className="play-orb"><Play size={28} fill="currentColor"/></div><span className="video-chip">APPROVED LECTURE</span><span className="video-duration">{videos.find(v=>v[0]===selected)?.[3]}</span></div><div className="video-info"><div><h3>{selected}</h3><p>{videos.find(v=>v[0]===selected)?.[1]} · {videos.find(v=>v[0]===selected)?.[2]}</p></div><button className="outline-btn" onClick={()=>notify('Bookmark saved in demo mode.')}><BookMarked size={15}/> Bookmark</button></div><div className="video-tools"><button onClick={()=>notify('Transcript panel is a UI demo.')}><FileText size={15}/> Transcript</button><button onClick={()=>notify('AI lecture Q&A needs an AI service connection.')}><Sparkles size={15}/> Ask lecture AI</button><button onClick={()=>notify('Notes panel is a UI demo.')}><Clipboard size={15}/> Notes</button></div></section><section className="panel video-list"><div className="panel-head"><div><h3>Continue learning</h3><p>Recently added lectures</p></div><button className="more-btn"><MoreHorizontal size={18}/></button></div>{videos.map(v=><button key={v[0]} className={`video-row ${selected===v[0]?'current':''}`} onClick={()=>setSelected(v[0])}><div className="video-thumb"><Play size={17}/></div><div className="video-row-copy"><b>{v[0]}</b><small>{v[1]} · {v[2]}</small><div className="progress"><i style={{width:v[4]}}/></div></div><span>{v[3]}</span></button>)}</section></div><div className="notice"><Shield size={16}/><span>Only institution-approved educational recordings are available to students. Security CCTV footage remains restricted to authorized campus security personnel.</span></div></>;
}
function Students({students,searchTerm,setSearchTerm,openAdd}){
 return <><PageHeader eyebrow="CAMPUS DIRECTORY" title="Student management" subtitle="View student records, academic details and enrollment status." action actionLabel="Add student" onAction={openAdd}/><div className="stat-grid"><Stat label="Total students" value="2,846" change="+8.4% this semester" icon={Users}/><Stat label="Active enrollment" value="2,791" change="98.1% of total" icon={CheckCircle2} tone="green"/><Stat label="Needs attention" value="18" change="Attendance below 75%" icon={AlertCircle} tone="orange"/><Stat label="Departments" value="12" change="Across 4 schools" icon={Building2} tone="cyan"/></div><section className="panel table-panel"><div className="panel-head"><div><h3>Student directory</h3><p>Showing {students.length} demo records</p></div><div className="table-actions"><div className="inline-search"><Search size={15}/><input placeholder="Search students..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/></div><button className="outline-btn"><Filter size={15}/> Filter</button><button className="outline-btn"><Download size={15}/> Export</button></div></div><div className="table-wrap"><table><thead><tr><th>STUDENT</th><th>STUDENT ID</th><th>DEPARTMENT</th><th>YEAR</th><th>ATTENDANCE</th><th>STATUS</th></tr></thead><tbody>{students.map(s=><tr key={s.id}><td><div className="student-cell"><div className="avatar tiny">{s.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</div><b>{s.name}</b></div></td><td>{s.id}</td><td>{s.dept}</td><td>{s.year}</td><td><b className={parseInt(s.attendance)<75?'text-orange':''}>{s.attendance}</b></td><td><span className={`status-pill ${s.status==='Active'?'green-pill':'orange-pill'}`}>{s.status}</span></td></tr>)}</tbody></table></div></section></>;
}
function Timetable({notify}){
 const days=['Monday','Tuesday','Wednesday','Thursday','Friday'];const periods=['09:00 – 10:00','10:15 – 11:15','11:30 – 12:30','01:30 – 02:30','02:45 – 03:45'];const subjects=[['Data Structures','Machine Learning','Mathematics','Library','Lab'],['Database Systems','Networks','Data Structures','Soft Skills','Lab'],['Machine Learning','Mathematics','Networks','Data Structures','Project'],['Networks','Data Structures','Database Systems','Lab','Sports'],['Mathematics','Project Review','Machine Learning','Library','Seminar']];
 return <><PageHeader eyebrow="ACADEMICS / SCHEDULING" title="Smart timetable" subtitle="Weekly class schedule with faculty and classroom allocation." action actionLabel="Create schedule" onAction={()=>notify('Schedule creation form can be connected to timetable API.')}/><div className="timetable-top"><div className="filter-pills"><button className="selected">III Year · Section A</button><button>Computer Science</button><button>Semester 5</button></div><button className="outline-btn" onClick={()=>notify('Timetable export prepared in demo mode.')}><Download size={15}/> Export timetable</button></div><section className="panel timetable-panel"><div className="timetable-grid"><div className="day-cell blank">TIME</div>{days.map(d=><div className="day-cell" key={d}>{d}</div>)}{periods.map((p,i)=><React.Fragment key={p}><div className="time-cell">{p}</div>{days.map((d,j)=><div className="class-cell" key={d+i}><div className={`class-block color-${(i+j)%4}`}><b>{subjects[j][i]}</b><small>{['Room A-204','AI Lab 02','Room B-106'][((i+j)%3)]}</small><small>{['09:00 AM','10:15 AM','11:30 AM','01:30 PM','02:45 PM'][i]}</small></div></div>)}</React.Fragment>)}</div></section></>;
}
function Learning({page,tasks,setTasks,notify}){
 const [filter,setFilter]=useState('All');
 return <><PageHeader eyebrow="ACADEMIC WORKSPACE" title={page} subtitle={descriptions[page]}/><div className="stat-grid"><Stat label={page==='Assignments'?'Open assignments':'Upcoming assessments'} value="08" change="Across your courses" icon={ClipboardList}/><Stat label="Completed" value="24" change="+4 this month" icon={CheckCircle2} tone="green"/><Stat label="Pending review" value="06" change="Faculty review required" icon={Clock} tone="orange"/><Stat label="Average progress" value="86%" change="+5.6% this term" icon={TrendingUp} tone="cyan"/></div><section className="panel"><div className="panel-head"><div><h3>{page==='Assignments'?'Your assignments':page==='Exams & Results'?'Assessment overview':'Learning resources'}</h3><p>Course work and academic activity</p></div><button className="primary-btn" onClick={()=>notify('New item form is a demo action.')}><Plus size={15}/> Create new</button></div><div className="filter-pills">{['All','Not started','In progress','Submitted'].map(x=><button key={x} className={filter===x?'selected':''} onClick={()=>setFilter(x)}>{x}</button>)}</div><div className="task-list">{tasks.filter(t=>filter==='All'||t.state===filter).map((t,i)=><div className="task-row" key={t.title}><div className="task-icon"><FileText size={18}/></div><div className="task-copy"><b>{t.title}</b><small>{t.meta}</small></div><span className={`status-pill ${t.state==='Submitted'?'green-pill':t.state==='In progress'?'cyan-pill':'orange-pill'}`}>{t.state}</span><button className="tiny-action" onClick={()=>notify('Opened item details in demo mode.')}>View details <ArrowUpRight size={13}/></button></div>)}</div></section></>;
}
function Notifications({notify}){
 const data=[['Attendance reminder','Your Data Structures attendance session is scheduled at 9:00 AM.','Today · 08:30 AM','purple'],['New recorded class','Machine Learning – Introduction is now available.','Today · 07:15 AM','cyan'],['Fee payment update','Semester fee receipt has been generated.','Yesterday · 04:20 PM','green'],['Placement drive','A new internship opportunity matches your department.','Yesterday · 11:00 AM','orange']];
 return <><PageHeader eyebrow="CAMPUS UPDATES" title="Notifications" subtitle="Stay informed about academic updates, campus activities and important alerts."/><section className="panel"><div className="panel-head"><div><h3>Recent notifications</h3><p>4 updates in your inbox</p></div><button className="outline-btn" onClick={()=>notify('All notifications marked as read in demo mode.')}><Check size={15}/> Mark all as read</button></div>{data.map(([t,d,tm,c])=><div className="notification-row" key={t}><div className={`notification-icon ${c}`}><Bell size={17}/></div><div><b>{t}</b><p>{d}</p><small>{tm}</small></div><span className="unread-dot"/></div>)}</section></>;
}
function GenericPage({page,notify,openAdd}){
 const featureMap={
 'Project Hub':[['Project ideas','Browse project domains and AI-assisted suggestions'],['Team workspace','Create teams and manage members'],['Guide allocation','Submit guide preferences and approvals'],['Milestone tracker','Weekly progress, reviews and final submission']],
 'Placement & Career':[['Placement drives','Upcoming companies and campus recruitment'],['Eligibility checker','Check CGPA, backlog and skill criteria'],['Career preparation','Aptitude, coding and mock interviews'],['Applications','Track rounds, status and offers']],
 'Library':[['Catalog search','Books, journals and e-resources'],['Issue / return','Manage circulation and renewals'],['Reservations','Reserve available titles'],['Due reminders','Track due dates and fines']],
 'Lab Management':[['Lab timetable','Practical sessions and lab availability'],['Equipment inventory','Track assets and issue / return'],['Lab booking','Reserve lab slots'],['Maintenance','Report equipment issues']],
 'Hostel':[['Room allocation','Room availability and student allocation'],['Resident directory','Hostel resident records'],['Visitor register','Entry and exit logs'],['Hostel complaints','Maintenance and warden follow-up']],
 'Transport':[['Routes & stops','Manage routes and student allocation'],['Vehicle records','Bus, driver and permit details'],['Live tracking','Connected GPS feed status'],['Transport passes','Student passes and renewals']],
 'Canteen':[['Daily menu','Food categories and availability'],['Pre-orders','Student order queue'],['Kitchen dashboard','Prepare and mark orders ready'],['Payments','Digital payment reconciliation']],
 'Events & Clubs':[['Event calendar','Workshops, symposiums and cultural events'],['Club directory','Student clubs and coordinators'],['Registrations','Manage participants and capacity'],['Certificates','Participation and achievement records']],
 'Fees & Finance':[['Fee structure','Configure semester and category fees'],['Payment records','UPI, card and offline payment records'],['Scholarships','Concessions and eligibility'],['Receipts & dues','Receipts, reminders and outstanding balance']],
 'Safety & Security':[['Visitor management','Pre-registration and digital visitor passes'],['Campus incidents','Incident reports and response status'],['Emergency alerts','Authorized campus-wide alerts'],['CCTV access','Restricted security camera monitoring']],
 'Grievances':[['New submissions','Review incoming student concerns'],['Assignment & escalation','Route cases to responsible teams'],['Resolution tracking','SLA, status and response history'],['Feedback','Collect resolution satisfaction']],
 'Parent Portal':[['Linked students','View authorized student profiles'],['Attendance & results','Academic progress and absence alerts'],['Fee information','Dues, receipts and payment history'],['Communication','Teacher contact and meeting requests']],
 'Reports & Analytics':[['Academic performance','Department, semester and subject trends'],['Attendance insights','Absence patterns and early support'],['Placement outcomes','Drive participation and offer statistics'],['Operations','Fees, grievances and facility metrics']],
 'Settings':[['Institution profile','College identity, terms and academic year'],['Roles & permissions','Configure access by role'],['Module settings','Enable features for each institution'],['Audit & security','Login activity, logs and retention']],
 'Faculty':[['Faculty directory','Profiles, departments and subject allocation'],['Workload','Teaching hours and substitutions'],['Leave & attendance','Faculty attendance and leave workflow'],['Mentoring','Student mentoring and advisee tracking']]
 };
 const features=featureMap[page]||[['Overview','Centralized information and module status'],['Manage records','Create, view and update authorized records'],['Workflow & approvals','Route requests to responsible teams'],['Reports','Track activity and performance']];
 const IconSet=[BookOpen,Users,ClipboardCheck,ChartIcon];
 return <><PageHeader eyebrow="SMART CAMPUS 360 / WORKSPACE" title={page} subtitle={descriptions[page]||'Manage this campus module from one connected workspace.'} action actionLabel="Create record" onAction={()=>openAdd(`Create ${page.toLowerCase()} record`)}/><div className="module-banner"><div className="module-banner-icon"><Sparkles size={23}/></div><div><b>{page} workspace</b><p>Role-aware tools and workflows for your institution. Choose a workspace card to explore the module.</p></div><span className="coming-label">MODULE PREVIEW</span></div><div className="module-grid">{features.map(([t,d],i)=>{const I=[BookOpen,Users,ClipboardCheck,TrendingUp][i];return <button className="module-card" key={t} onClick={()=>notify(`${t}: this module screen is represented in the frontend demo. Connect the backend to manage live records.`)}><div className={`module-icon tone-${i}`}><I size={20}/></div><div><b>{t}</b><p>{d}</p></div><ArrowUpRight size={16} className="module-arrow"/></button>})}</div><div className="notice"><Shield size={16}/><span>Module interface preview: live data, permissions, approvals and integrations become operational after connecting the backend services.</span></div></>;
}
function ChartIcon(){return TrendingUp}

createRoot(document.getElementById('root')).render(<App/>);
