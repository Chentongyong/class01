/*点击头像触发*/ 
        document.getElementById('tpcs').addEventListener('tap', function() { 
            if (mui.os.plus) { 
                var a = [{ 
                    title: "拍照" 
                }, { 
                    title: "从手机相册选择" 
                }]; 
                plus.nativeUI.actionSheet({ 
                    title: "修改用户头像", 
                    cancel: "取消", 
                    buttons: a 
                }, function(b) { /*actionSheet 按钮点击事件*/ 
                    switch (b.index) { 
                        case 0: 
                            break; 
                        case 1: 
                            getImage(); /*拍照*/ 
                            break; 
                        case 2: 
                            galleryImg();/*打开相册*/ 
                            break; 
                        default: 
                            break; 
                    } 
                }) 
            } 
        }, false);
        
//拍照 
        function getImage() { 
            var c = plus.camera.getCamera(); 
            c.captureImage(function(e) { 
                plus.io.resolveLocalFileSystemURL(e, function(entry) { 
                    var s = entry.toLocalURL() + "?version=" + new Date().getTime(); 
                }, function(e) { 
                    console.log("读取拍照文件错误：" + e.message); 
                }); 
            }, function(s) { 
                console.log("error" + s); 
            }, { 
                filename: "_doc/head.png" 
            }) 
        }
        
//本地相册选择 
        function galleryImg() { 
            plus.gallery.pick(function(a) { 
                plus.io.resolveLocalFileSystemURL(a, function(entry) { 
                    plus.io.resolveLocalFileSystemURL("_doc/", function(root) { 
                        root.getFile("head.png", {}, function(file) { 
                            //文件已存在 
                            file.remove(function() { 
                                console.log("file remove success"); 
                                entry.copyTo(root, 'head.png', function(e) { 
                                        var e = e.fullPath + "?version=" + new Date().getTime();
                                        uploadHead(e); /*上传图片*/ 
                                        //变更大图预览的src 
                                        //目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现 
                                    }, 
                                    function(e) { 
                                        console.log('copy image fail:' + e.message); 
                                    }); 
                            }, function() { 
                                console.log("delete image fail:" + e.message); 
                            }); 
                        }, function() { 
                            //文件不存在 
                            entry.copyTo(root, 'head.png', function(e) { 
                                    var path = e.fullPath + "?version=" + new Date().getTime();
                                    uploadHead(path); /*上传图片*/ 
                                }, 
                                function(e) { 
                                    console.log('copy image fail:' + e.message); 
                                }); 
                        }); 
                    }, function(e) { 
                        console.log("get _www folder fail"); 
                    }) 
                }, function(e) { 
                    console.log("读取拍照文件错误：" + e.message); 
                }); 
            }, function(a) {}, { 
                filter: "image" 
            }) 
        };
        
//上传头像图片 
        function uploadHead(imgPath) { 
            console.log("imgPath = " + imgPath); 
            mainImage.src = imgPath; 
            mainImage.style.width = "60px"; 
            mainImage.style.height = "60px"; 
            var image = new Image(); 
            image.src = imgPath; 
            image.onload = function() { 
                var imgData = getBase64Image(image); 
                mui.toast(imgData);
                /*在这里调用上传接口*/ 
                mui.ajax("http://120.79.76.48/Store/storeactions!addAppStore.action?store.sname="+imgData, { 
                    data: { 
                    }, 
                    dataType: 'json', 
                    type: 'post', 
                    timeout: 10000, 
                    success: function(data) { 
                        console.log('上传成功'); 
                    }, 
                    error: function(xhr, type, errorThrown) { 
                        mui.toast('网络异常，请稍后再试！'); 
                    } 
                }); 
            } 
    } 
        //将图片压缩转成base64 
        function getBase64Image(img) { 
            var canvas = document.createElement("canvas"); 
            var width = img.width; 
            var height = img.height; 
            if (width > height) { 
                if (width > 100) { 
                    height = Math.round(height *= 100 / width); 
                    width = 100; 
                } 
            } else { 
                if (height > 100) { 
                    width = Math.round(width *= 100 / height); 
                    height = 100; 
                } 
            } 
            canvas.width = width;   /*设置新的图片的宽度*/ 
            canvas.height = height; /*设置新的图片的长度*/ 
            var ctx = canvas.getContext("2d"); 
            ctx.drawImage(img, 0, 0, width, height); /*绘图*/ 
            var dataURL = canvas.toDataURL("image/png", 0.8); 
            return dataURL.replace("data:image/png;base64,", ""); 
        }