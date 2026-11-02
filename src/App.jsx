import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DemoBookingModal } from './components/common/DemoBookingModal';
import { ScrollToTop } from './components/common/ScrollToTop';

// Pages
import { HomePage } from './pages/Home/HomePage';
import { LocalTaxiPage } from './pages/Services/LocalTaxiPage';
import { OutstationCabPage } from './pages/Services/OutstationCabPage';
import { AirportTransferPage } from './pages/Services/AirportTransferPage';
import { MiniBusPage } from './pages/Services/MiniBusPage';
import { LuxuryBusPage } from './pages/Services/LuxuryBusPage';
import { GroupTravelPage } from './pages/Services/GroupTravelPage';
import { TrainBookingPage } from './pages/Services/TrainBookingPage';
import { MaharashtraSTBusPage } from './pages/Services/MaharashtraSTBusPage';
import { NcmcTransitPage } from './pages/Services/NcmcTransitPage';

// Corporate Pages
import { CorporateLayout } from './pages/Corporate/CorporateLayout';
import { CorporateOverviewPage } from './pages/Corporate/CorporateOverviewPage';
import { CorporateAdminPortal } from './pages/Corporate/CorporateAdminPortal';
import { CorporateEmployeePortal } from './pages/Corporate/CorporateEmployeePortal';
import { EmployeeTransportPage } from './pages/Corporate/EmployeeTransportPage';
import { DailyPickupDropPage } from './pages/Corporate/DailyPickupDropPage';
import { MonthlyContractsPage } from './pages/Corporate/MonthlyContractsPage';
import { BusinessTravelPage } from './pages/Corporate/BusinessTravelPage';
import { CorporatePricingPage } from './pages/Corporate/CorporatePricingPage';
import { CorporateDemoPage } from './pages/Corporate/CorporateDemoPage';
import { CorporateDashboardPage } from './pages/Corporate/CorporateDashboardPage';
import { TransportOperationsPage } from './pages/Corporate/TransportOperationsPage';
import { DriverPortalPage } from './pages/Corporate/DriverPortalPage';
import { VendorPortalPage } from './pages/Corporate/VendorPortalPage';
import { FinanceBillingPage } from './pages/Corporate/FinanceBillingPage';
import { CorporateReportsPage } from './pages/Corporate/CorporateReportsPage';
import { CorporateBusShuttlePage } from './pages/Corporate/CorporateBusShuttlePage';
import { CorporateSafetyPage } from './pages/Corporate/CorporateSafetyPage';
import { CorporateQuotePage } from './pages/Corporate/CorporateQuotePage';
import { CorporateLoginPage } from './pages/Corporate/CorporateLoginPage';

// User Dashboard Pages
import { UserDashboardLayout } from './pages/Dashboard/UserDashboardLayout';
import { UserDashboardPage } from './pages/Dashboard/UserDashboardPage';
import { MyBookingsPage } from './pages/Dashboard/MyBookingsPage';
import { BookingDetailsPage } from './pages/Dashboard/BookingDetailsPage';
import { ProfilePage } from './pages/Dashboard/ProfilePage';
import {
  CustomerRailwayTicketsPage,
  CustomerMsrtcTicketsPage,
  CustomerCabBookingsPage,
  CustomerBusBookingsPage,
  CustomerNcmcCardsPage,
  CustomerPaymentHistoryPage,
  CustomerRefundRequestsPage,
  CustomerNotificationsPage,
  CustomerSupportTicketsPage
} from './pages/Dashboard/CustomerSubPages';

// Super Admin Pages
import { SuperAdminLayout } from './pages/Admin/SuperAdminLayout';
import { SuperAdminDashboardPage } from './pages/Admin/SuperAdminDashboardPage';
import { ProviderStatusPage } from './pages/Admin/ProviderStatusPage';
import {
  SuperAdminUsersPage,
  SuperAdminBookingsPage,
  SuperAdminRailwayServicesPage,
  SuperAdminMsrtcServicesPage,
  SuperAdminNcmcServicesPage,
  SuperAdminCabOperatorsPage,
  SuperAdminBusOperatorsPage,
  SuperAdminVehiclesPage,
  SuperAdminDriversPage,
  SuperAdminCorporateClientsPage,
  SuperAdminPaymentsDemoPage,
  SuperAdminRefundManagementPage,
  SuperAdminReportsPage,
  SuperAdminSupportPage,
  SuperAdminSettingsPage
} from './pages/Admin/SuperAdminSections';

// Auth Pages
import { LoginPage } from './pages/Auth/LoginPage';
import { SignUpPage } from './pages/Auth/SignUpPage';

// General Pages
import { AboutUsPage } from './pages/About/AboutUsPage';
import { ContactUsPage } from './pages/Contact/ContactUsPage';
import { FaqPage } from './pages/Faq/FaqPage';

// Railway Module Pages
import { RailwayLayout } from './pages/Railway/RailwayLayout';
import { RailwaySearchPage } from './pages/Railway/RailwaySearchPage';
import { TrainResultsPage } from './pages/Railway/TrainResultsPage';
import { PassengerDetailsPage } from './pages/Railway/PassengerDetailsPage';
import { BookingReviewPage } from './pages/Railway/BookingReviewPage';
import { DemoPaymentPage } from './pages/Railway/DemoPaymentPage';
import { DemoTicketPage } from './pages/Railway/DemoTicketPage';
import { PnrStatusDemoPage } from './pages/Railway/PnrStatusDemoPage';
import { RailwayCancellationPage } from './pages/Railway/RailwayCancellationPage';
import { RefundStatusPage } from './pages/Railway/RefundStatusPage';

// MSRTC Module Pages
import { MsrtcLayout } from './pages/MSRTC/MsrtcLayout';
import { MsrtcSearchPage } from './pages/MSRTC/MsrtcSearchPage';
import { MsrtcResultsPage } from './pages/MSRTC/MsrtcResultsPage';
import { MsrtcSeatLayoutPage } from './pages/MSRTC/MsrtcSeatLayoutPage';
import { MsrtcPassengerConcessionPage } from './pages/MSRTC/MsrtcPassengerConcessionPage';
import { MsrtcFareReviewPage } from './pages/MSRTC/MsrtcFareReviewPage';
import { MsrtcPaymentPage } from './pages/MSRTC/MsrtcPaymentPage';
import { MsrtcTicketPage } from './pages/MSRTC/MsrtcTicketPage';
import { MsrtcMyTicketsPage } from './pages/MSRTC/MsrtcMyTicketsPage';
import { MsrtcCancelRefundPage } from './pages/MSRTC/MsrtcCancelRefundPage';

// NCMC Module Pages
import { NcmcLayout } from './pages/NCMC/NcmcLayout';
import { NcmcOverviewPage } from './pages/NCMC/NcmcOverviewPage';
import { NcmcDashboardPage } from './pages/NCMC/NcmcDashboardPage';
import { NcmcRegisterPage } from './pages/NCMC/NcmcRegisterPage';
import { NcmcLinkPage } from './pages/NCMC/NcmcLinkPage';
import { NcmcRechargePage } from './pages/NCMC/NcmcRechargePage';
import { NcmcTransactionsPage } from './pages/NCMC/NcmcTransactionsPage';
import { NcmcPassPage } from './pages/NCMC/NcmcPassPage';
import { NcmcLostCardPage } from './pages/NCMC/NcmcLostCardPage';
import { NcmcSupportPage } from './pages/NCMC/NcmcSupportPage';

// Complete Booking Workflow Page
import { BookingWorkflowPage } from './pages/Booking/BookingWorkflowPage';

export default function App() {
  return (
    <BookingProvider>
      <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#153B5B]">
        <ScrollToTop />
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Home */}
            <Route path="/" element={<HomePage />} />

            {/* Complete 10-Service Booking Workflow Engine */}
            <Route path="/book" element={<BookingWorkflowPage />} />

            {/* Individual Service Pages */}
            <Route path="/services/local-taxi" element={<LocalTaxiPage />} />
            <Route path="/services/outstation-cabs" element={<OutstationCabPage />} />
            <Route path="/services/airport-transfers" element={<AirportTransferPage />} />
            <Route path="/services/mini-bus" element={<MiniBusPage />} />
            <Route path="/services/luxury-bus" element={<LuxuryBusPage />} />
            <Route path="/services/group-travel" element={<GroupTravelPage />} />
            <Route path="/services/train-tickets" element={<TrainBookingPage />} />
            <Route path="/services/maharashtra-st-bus" element={<MaharashtraSTBusPage />} />
            <Route path="/services/ncmc-transit" element={<NcmcTransitPage />} />

            {/* Railway Module Routes */}
            <Route path="/railway" element={<RailwayLayout />}>
              <Route index element={<RailwaySearchPage />} />
              <Route path="results" element={<TrainResultsPage />} />
              <Route path="passengers" element={<PassengerDetailsPage />} />
              <Route path="review" element={<BookingReviewPage />} />
              <Route path="payment" element={<DemoPaymentPage />} />
              <Route path="ticket/:ref" element={<DemoTicketPage />} />
              <Route path="pnr-status" element={<PnrStatusDemoPage />} />
              <Route path="cancel" element={<RailwayCancellationPage />} />
              <Route path="refund-status" element={<RefundStatusPage />} />
            </Route>

            {/* MSRTC Module Routes */}
            <Route path="/msrtc" element={<MsrtcLayout />}>
              <Route index element={<MsrtcSearchPage />} />
              <Route path="results" element={<MsrtcResultsPage />} />
              <Route path="seats" element={<MsrtcSeatLayoutPage />} />
              <Route path="passengers" element={<MsrtcPassengerConcessionPage />} />
              <Route path="review" element={<MsrtcFareReviewPage />} />
              <Route path="payment" element={<MsrtcPaymentPage />} />
              <Route path="ticket/:ref" element={<MsrtcTicketPage />} />
              <Route path="my-tickets" element={<MsrtcMyTicketsPage />} />
              <Route path="cancel" element={<MsrtcCancelRefundPage />} />
            </Route>

            {/* NCMC Smart Mobility Module Routes */}
            <Route path="/ncmc" element={<NcmcLayout />}>
              <Route index element={<NcmcOverviewPage />} />
              <Route path="dashboard" element={<NcmcDashboardPage />} />
              <Route path="register" element={<NcmcRegisterPage />} />
              <Route path="link" element={<NcmcLinkPage />} />
              <Route path="recharge" element={<NcmcRechargePage />} />
              <Route path="transactions" element={<NcmcTransactionsPage />} />
              <Route path="passes" element={<NcmcPassPage />} />
              <Route path="lost-card" element={<NcmcLostCardPage />} />
              <Route path="support" element={<NcmcSupportPage />} />
            </Route>

            {/* Corporate Section */}
            <Route path="/corporate" element={<CorporateLayout />}>
              <Route index element={<CorporateOverviewPage />} />
              <Route path="admin" element={<CorporateAdminPortal />} />
              <Route path="transport-manager" element={<TransportOperationsPage />} />
              <Route path="employee" element={<CorporateEmployeePortal />} />
              <Route path="driver" element={<DriverPortalPage />} />
              <Route path="vendor" element={<VendorPortalPage />} />
              <Route path="finance" element={<FinanceBillingPage />} />
              <Route path="reports" element={<CorporateReportsPage />} />
              <Route path="employee-transport" element={<EmployeeTransportPage />} />
              <Route path="daily-pickup" element={<DailyPickupDropPage />} />
              <Route path="bus-shuttle" element={<CorporateBusShuttlePage />} />
              <Route path="monthly-contracts" element={<MonthlyContractsPage />} />
              <Route path="business-travel" element={<BusinessTravelPage />} />
              <Route path="safety" element={<CorporateSafetyPage />} />
              <Route path="pricing" element={<CorporatePricingPage />} />
              <Route path="quote" element={<CorporateQuotePage />} />
              <Route path="demo" element={<CorporateDemoPage />} />
              <Route path="login" element={<CorporateLoginPage />} />
              <Route path="dashboard" element={<CorporateAdminPortal />} />
            </Route>
            <Route path="/corporate-login" element={<CorporateLoginPage />} />

            {/* User Dashboard Section */}
            <Route path="/dashboard" element={<UserDashboardLayout />}>
              <Route index element={<UserDashboardPage />} />
              <Route path="my-bookings" element={<MyBookingsPage />} />
              <Route path="bookings/:id" element={<BookingDetailsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="railway-tickets" element={<CustomerRailwayTicketsPage />} />
              <Route path="msrtc-tickets" element={<CustomerMsrtcTicketsPage />} />
              <Route path="cab-bookings" element={<CustomerCabBookingsPage />} />
              <Route path="bus-bookings" element={<CustomerBusBookingsPage />} />
              <Route path="ncmc-cards" element={<CustomerNcmcCardsPage />} />
              <Route path="payments" element={<CustomerPaymentHistoryPage />} />
              <Route path="refunds" element={<CustomerRefundRequestsPage />} />
              <Route path="notifications" element={<CustomerNotificationsPage />} />
              <Route path="support" element={<CustomerSupportTicketsPage />} />
            </Route>

            {/* Super Admin Dashboard Section */}
            <Route path="/admin" element={<SuperAdminLayout />}>
              <Route index element={<SuperAdminDashboardPage />} />
              <Route path="users" element={<SuperAdminUsersPage />} />
              <Route path="bookings" element={<SuperAdminBookingsPage />} />
              <Route path="railway-services" element={<SuperAdminRailwayServicesPage />} />
              <Route path="msrtc-services" element={<SuperAdminMsrtcServicesPage />} />
              <Route path="ncmc-services" element={<SuperAdminNcmcServicesPage />} />
              <Route path="cab-operators" element={<SuperAdminCabOperatorsPage />} />
              <Route path="bus-operators" element={<SuperAdminBusOperatorsPage />} />
              <Route path="vehicles" element={<SuperAdminVehiclesPage />} />
              <Route path="drivers" element={<SuperAdminDriversPage />} />
              <Route path="corporate-clients" element={<SuperAdminCorporateClientsPage />} />
              <Route path="payments-demo" element={<SuperAdminPaymentsDemoPage />} />
              <Route path="refund-management" element={<SuperAdminRefundManagementPage />} />
              <Route path="reports" element={<SuperAdminReportsPage />} />
              <Route path="provider-status" element={<ProviderStatusPage />} />
              <Route path="support" element={<SuperAdminSupportPage />} />
              <Route path="settings" element={<SuperAdminSettingsPage />} />
            </Route>

            {/* Authentication */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Informational Pages */}
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/faqs" element={<FaqPage />} />

            {/* Fallback to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />
        <DemoBookingModal />
      </div>
    </BookingProvider>
  );
}
