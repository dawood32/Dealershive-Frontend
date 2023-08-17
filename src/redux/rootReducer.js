import {combineReducers} from 'redux';
import emailSignupreducer from './reducer/emailSignupreducer';
import otpsignupemail from './reducer/Otpsignupemail';
import LoginEmailReducer from './reducer/loginemailreducer';
import GoogleSignupReducer from './reducer/googlesignupreducer';
import GooglesigninReducer from './reducer/googlesignreducer';
import RembermeReducer from './reducer/remeberme';
import HomeDataReducer from './reducer/homedatareducer';
import HomeSearchReducer from './reducer/homesearchreducer';
import FilterDataReducer from './reducer/filterdatareducer';
import SearchSuggestionReducer from './reducer/searchsuggestionreducer';
import LikedislikeReducer from './reducer/likedislikereducer';
import EditProfileReducer from './reducer/editprofilereducer';
import UserProfileReducer from './reducer/userprofilereducer';
import CategoryReducer from './reducer/categoryreducer';
import HomeMainDataReducer from './reducer/homemaindatareducer';
import MessageListReducer from './reducer/messagelistreducer';
import MuteChatReducer from './reducer/mutechatreducer';
import UnmuteChatReducer from './reducer/unmutechatreducer';
import DeleteChatReducer from './reducer/deletechatreducer';
import PinChatReducer from './reducer/pinchatreducer';
import UnPinChatReducer from './reducer/unpinchatreducer';
import MarkReadReducer from './reducer/markreadreducer';
import MarkUnReadReducer from './reducer/markunreadreducer';
import ChatSearchReducer from './reducer/chatsearchreducer';
import RecentChatReducer from './reducer/recentchatreducer';
import SendMessageReducer from './reducer/sendmessagereducer';
import SearchInboxReducer from './reducer/searchinboxreducer';
import ReportChatReducer from './reducer/reportchatreducer';
import ChatMediaReducer from './reducer/chatmediareducer';
import FilterUnreadReducer from './reducer/filterunreadreducer';
const rootReducer = combineReducers({
  emailSignupreducer: emailSignupreducer,
  otpsignupemail: otpsignupemail,
  LoginEmailReducer: LoginEmailReducer,
  GoogleSignupReducer: GoogleSignupReducer,
  GooglesigninReducer: GooglesigninReducer,
  RembermeReducer: RembermeReducer,
  HomeDataReducer: HomeDataReducer,
  HomeSearchReducer: HomeSearchReducer,
  FilterDataReducer: FilterDataReducer,
  SearchSuggestionReducer: SearchSuggestionReducer,
  LikedislikeReducer: LikedislikeReducer,
  EditProfileReducer: EditProfileReducer,
  UserProfileReducer: UserProfileReducer,
  CategoryReducer: CategoryReducer,
  HomeMainDataReducer: HomeMainDataReducer,
  MessageListReducer: MessageListReducer,
  MuteChatReducer: MuteChatReducer,
  UnmuteChatReducer: UnmuteChatReducer,
  DeleteChatReducer: DeleteChatReducer,
  PinChatReducer: PinChatReducer,
  UnPinChatReducer: UnPinChatReducer,
  MarkReadReducer: MarkReadReducer,
  MarkUnReadReducer: MarkUnReadReducer,
  ChatSearchReducer: ChatSearchReducer,
  RecentChatReducer: RecentChatReducer,
  SendMessageReducer: SendMessageReducer,
  SearchInboxReducer: SearchInboxReducer,
  ReportChatReducer: ReportChatReducer,
  ChatMediaReducer: ChatMediaReducer,
  FilterUnreadReducer: FilterUnreadReducer,
});
export default rootReducer;
