/**
 * Happy Exit - 離職全能導航幫手
 * Design System v1.4
 */

import { useAppState } from './hooks/useAppState';
import {
  WelcomePage,
  JoinDatePage,
  LeaveDatePage,
  SalaryInfoPage,
  ResultPage,
  MenuPage,
  LetterInfoPage,
  LetterResultPage,
  JobSearchPage,
  ChecklistPage,
  RightsPage,
  DigitalSecurityPage,
  CompletePage,
} from './pages';

function App() {
  const {
    stage,
    setStage,
    dateMode,
    setDateMode,
    copiedId,
    form,
    calc,
    checklist,
    updateForm,
    doCalc,
    copy,
    reset,
    getLeaveDate,
    toggleCheck,
  } = useAppState();

  switch (stage) {
    case 'welcome':
      return <WelcomePage setStage={setStage} />;

    case 'join-date':
      return <JoinDatePage form={form} updateForm={updateForm} setStage={setStage} />;

    case 'leave-date':
      return (
        <LeaveDatePage
          form={form}
          dateMode={dateMode}
          setDateMode={setDateMode}
          updateForm={updateForm}
          setStage={setStage}
          doCalc={doCalc}
        />
      );

    case 'salary-info':
      return (
        <SalaryInfoPage
          form={form}
          dateMode={dateMode}
          updateForm={updateForm}
          setStage={setStage}
          doCalc={doCalc}
        />
      );

    case 'result':
      return <ResultPage form={form} calc={calc} dateMode={dateMode} setStage={setStage} />;

    case 'menu':
      return <MenuPage form={form} calc={calc} setStage={setStage} />;

    case 'letter-info':
      return <LetterInfoPage form={form} updateForm={updateForm} setStage={setStage} />;

    case 'letter-result':
      return (
        <LetterResultPage
          form={form}
          calc={calc}
          copiedId={copiedId}
          getLeaveDate={getLeaveDate}
          copy={copy}
          setStage={setStage}
        />
      );

    case 'job-search':
      return <JobSearchPage form={form} calc={calc} copiedId={copiedId} copy={copy} setStage={setStage} />;

    case 'checklist':
      return <ChecklistPage checklist={checklist} toggleCheck={toggleCheck} setStage={setStage} />;

    case 'rights':
      return <RightsPage form={form} calc={calc} setStage={setStage} />;

    case 'digital':
      return <DigitalSecurityPage setStage={setStage} />;

    case 'complete':
      return <CompletePage setStage={setStage} reset={reset} />;

    default:
      return null;
  }
}

export default App;
