import {
  Assignment,
  Class,
  Description,
  AccountBalance,
  PlaylistAddCheck,
  School,
} from "@mui/icons-material";

export const dataBoxDashboard = [
  {
    id: 1,
    title: "تعداد تکالیف انجام شده",
    icon: (
      <PlaylistAddCheck
        fontSize="large"
        color="success"
        sx={{ fontSize: "60px" }}
      />
    ),
    value: `countDutyDone`,
  },
  {
    id: 2,
    title: "تعداد کلاس",
    icon: <Class fontSize="large" color="primary" sx={{ fontSize: "60px" }} />,
    value: "classCount",
  },
  {
    id: 3,
    title: "تعداد تکالیف انجام نشده",
    icon: (
      <Assignment fontSize="large" color="error" sx={{ fontSize: "60px" }} />
    ),
    value: `countDutyUncompleted`,
  },
  {
    id: 4,
    title: "تعداد آزمون",
    icon: (
      <Description fontSize="large" color="warning" sx={{ fontSize: "60px" }} />
    ),
    value: null,
  },
  {
    id: 5,
    title: "موجودی حساب",
    icon: (
      <AccountBalance
        fontSize="large"
        color="error"
        sx={{ fontSize: "60px" }}
      />
    ),
    value: null,
  },
  {
    id: 6,
    title: "تعداد تکالیف",
    icon: (
      <Assignment fontSize="large" color="success" sx={{ fontSize: "60px" }} />
    ),
    value: `assessmentCount`,
  },
];
export const dataHalpeDashboard = [
  {
    id: 1,
    text: "تعداد تکالیف انجام شده  شما در طول ترم",
    icon: (
      <PlaylistAddCheck
        fontSize="large"
        color="success"
        sx={{ fontSize: "60px" }}
      />
    ),
    value: "countDutyDone",
    color:'green'
  },
  {
    id: 2,
    text: "تعداد کلاس های عضو شده شما در طول ترم",
    value: "classCount",
    icon: <Class fontSize="large" color="primary" sx={{ fontSize: "60px" }} />,
    color:'blue'
  },
  {
    id: 3,
    text: "تعداد تکالیف انجام نشده شما در طول ترم",
    value: "countDutyUncompleted",
    icon: (
      <Assignment fontSize="large" color="error" sx={{ fontSize: "60px" }} />
    ),
    color:'red'
  },
  {
    id: 4,
    text: " تعداد آزمون هایی که شما در آن  شرکت کرده اید در طول ترم",
    value: null,
    icon: (
      <Description fontSize="large" color="warning" sx={{ fontSize: "60px" }} />
    ),
    color:'orange'
  },
  {
    id: 7,
    text: "تعداد کلاس های ایجاد شده شما در طول ترم",
    value: "classCount",
    icon: <Class fontSize="large" color="primary" sx={{ fontSize: "60px" }} />,
    color:'blue'
  },
  {
    id: 8,
    text: " تعداد آزمون هایی که شما در طول ترم ایجاد کرده اید",
    value: null,
    icon: (
      <Description fontSize="large" color="warning" sx={{ fontSize: "60px" }} />
    ),
    color:'orange'
  },
  {
    id: 5,
    text: "موجودی کیف پول شما برای خرید اشتراک",
    value: null,
    icon: (
      <AccountBalance
        fontSize="large"
        color="error"
        sx={{ fontSize: "60px" }}
      />
    ),
    color:'red'
  },
  {
    id: 6,
    text: "تعداد تکالیفی که در سامانه تعریف کرده اید",
    value: "assessmentCount",
    icon: (
      <Assignment fontSize="large" color="success" sx={{ fontSize: "60px" }} />
    ),
    color:'green'
  },
];
