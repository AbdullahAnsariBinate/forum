import React, { Component } from "react";
import AppBackground from "../../../components/AppBackground";
import { Dimensions, FlatList, Keyboard, ScrollView, Text, View } from "react-native";
import CustomText from "../../../components/CustomText";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../utils";
import NavService from "../../../helpers/NavService";
import { _Challenges, _Home, _dailyGoal } from "../../../utils/dummyData";
import CustomList from "../../../components/CustomList";
import { LineChart } from "react-native-chart-kit";
import ListComponent from "../../../components/ListComponent";
import ModalPopup from "../../../containers/Popup/modalPopup/modalPopup";
import CustomCard from "../../../components/CustomCard";
import { connect } from "react-redux";
import { ASSETS_URL } from "../../../config/WebService";
import CustomTextInput from "../../../components/CustomTextInput";
import { appIcons } from "../../../assets";
import Img from "../../../components/Img";
import CustomButton from "../../../components/CustomButton";
import Toast from "react-native-toast-message";
const { height, width } = Dimensions.get("screen");
export class UpdatePost extends Component {
  constructor(props) {
    super(props);
    const { post } = this.props.route.params;
    console.log(
      "🚀 ~ file: UpdatePost.js:26 ~ UpdatePost ~ constructor ~ post:",
      post
    );

    this.state = {
      isVisible: false,
      allPost: [],
      title: post?.title != "" ? post?.title : "",
      Description: post?.description != "" ? post?.description : "",
      target: "",
    };
  }
  componentDidMount() {
    this.getAllRequest();
  }
  ItemSeparatorComponent = () => {
    return <View style={{ height: 10 }} />;
  };
  handleClose = () => {
    this?.setState({ isVisible: false });
  };
  getAllRequest = () => {
    const url = "http://localhost:8000/api/getallpost";
    const token = this.props.user?.user_authentication;
    console.log("🚀 ~ file: Home.js:42 ~ Home ~ token:", token);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        // Handle the data as needed
        this?.setState({ allPost: data?.data });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors
      });
  };
  onSubmit = () => {
    const { title, Description, date, target } = this.state;
    Keyboard.dismiss();

    // console.log(phoneNumbers, 'phoneNumbersphoneNumbers');
    if (title == "") {
      Toast.show({
        text1: "Title field can`t be empty",
        type: "error",
        visibilityTime: 3000,
      });
    } else if (Description == "") {
      Toast.show({
        text1: "Description field can`t be empty",
        type: "error",
        visibilityTime: 3000,
      });
    } else {
      Keyboard.dismiss();

      // NavService.navigate('BottomTabs', {screen: 'MyGoals'});
      NavService.goBack();
      Toast.show({
        text1: "Goal Created Successfully",
        type: "success",
        visibilityTime: 3000,
      });

      // this.props.loginUser(payload);
      this.updatePost()
    }
  };
  updatePost = () => {
    const url = "http://localhost:8000/api/edit-post";
    const { post } = this.props.route.params;

    const token = this.props.user?.user_authentication;
    console.log("🚀 ~ file: Home.js:42 ~ Home ~ token:", token);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const body = JSON.stringify({_id:post?._id, title: this.state.title, description: this.state.Description,  });

    fetch(url, {
      method: "POST",
      headers: headers,
      body:body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        Keyboard.dismiss();
        Toast.show({
          text1: "Post Updated Successfully.",
          type: "success",
          visibilityTime: 3000,
        });
        NavService.navigate('Home')
        // Handle the data as needed
        // this?.setState({ allPost: data?.data });
      })
      .catch((error) => {
        console.error("Error:", error);
        Keyboard.dismiss()

        // Handle errors
      });
  };
  createPost = () => {
    const url = "http://localhost:8000/api/getallpost";
    const token = this.props.user?.user_authentication;
    console.log("🚀 ~ file: Home.js:42 ~ Home ~ token:", token);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        // Handle the data as needed
        this?.setState({ allPost: data?.data });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors
      });
  };
  render() {
    const { user } = this?.props;
    const { isVisible, title, Description, date, selectedDate, target } =
      this.state;
    const { post } = this.props.route.params;
    return (
      <AppBackground
        homePress={() => NavService.navigate("MyProfile")}
        back
        title={"UpdatePost"}
        marginHorizontal={false}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ gap: 15 }}>
            <View style={styles.ViewText}>
              {/* <CustomButton title="View Details" onPress={()=> NavService?.navigate('ChallengesParticipate')} /> */}

              {/* <CustomText text="" style={styles.text1} /> */}
              <TouchableOpacity onPress={() => NavService.navigate("MyGoals")}>
                {/* <CustomText text="View Details" style={styles.ViewDetails} /> */}
              </TouchableOpacity>
            </View>
            {/* <FlatList
              bounces={false}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: width * 0.32,
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(_index) => _index.toString()}
              data={this?.state?.allPost}
              ItemSeparatorComponent={this?.ItemSeparatorComponent}
              renderItem={({ item }) => (
                <CustomList
                  Status
                  _item={item}
                  _title2={item?.title}
                  _title3={item?.createAt}
                  _titleUser={item?.username}
                  statusColor={colors?.secondary}
                  customContainer={{
                    borderRadius: 15,
                    backgroundColor: colors?.lightBlue,
                  }}
                  role={user?.role}
                  onPress={() =>
                    NavService?.navigate("Commentss", { id: item?._id })
                  }
                />
              )}
            /> */}
            <View style={{ flex: 1, marginTop: 20, gap: 15 }}>
              <CustomTextInput
                color={colors.black}
                maxLength={35}
                // label
                // labeltext={'Email'}
                // leftIcon={appIcons.email}
                // Lineicon={appIcons.line}
                // Lineiconcolor={colors.gray}
                // Iconcolor={colors.secondary}
                placeholder={"Title"}
                placeholderColor={colors.lightGray}
                value={title}
                keyboardType={"email-address"}
                onChangeText={(value) => this.setState({ title: value })}
                containerStyle={{
                  borderRadius: 30,
                  alignItems: "flex-start",
                  paddingTop: 10,
                }}
              />
              <CustomTextInput
                textAlignVertical="top"
                maxLength={350}
                multiline
                color={colors.black}
                placeholder={"Description..."}
                value={Description}
                placeholderColor={colors.lightGray}
                borderRadius={30}
                isBorderShow
                borderColor={colors.primary}
                keyboardType={"email-address"}
                onChangeText={(value) => this.setState({ Description: value })}
                TextInputStyling={{ padding: 15, height: 300 }}
                containerStyle={{
                  borderRadius: 30,
                  height: 200,
                  alignItems: "flex-start",
                  paddingTop: 10,
                }}
              />
            </View>
            <View>
              <CustomButton
                title="Create"
                onPress={this.onSubmit}
                buttonStyle={styles.btn}
                textStyle={styles.btntext}
              />
            </View>
          </View>
        </ScrollView>
      </AppBackground>
    );
  }
}

function mapStateToProps({ authReducer: { user } }) {
  return {
    user,
  };
}
export default connect(mapStateToProps, null)(UpdatePost);
